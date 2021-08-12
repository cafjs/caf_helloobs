'use strict';
const caf = require('caf_core');
const caf_comp = caf.caf_components;
const myUtils = caf_comp.myUtils;
const app = require('../public/js/app.js');

const APP_SESSION = 'default'; //main app
const IOT_SESSION = 'iot'; // device
const USER_SESSION = /^user/; // third-party app

const notifyIoT = function(self, msg) {
    self.$.session.notify([msg], IOT_SESSION);
};

const notifyWebApps = function(self, msg) {
    self.$.session.notify([msg], APP_SESSION);
    self.$.session.notify([msg], USER_SESSION);
};

const doBundle = function(self, command, arg) {
    const bundle = self.$.iot.newBundle();
    if (arg === undefined) {
        bundle[command](0);
    } else {
        bundle[command](0, [arg]);
    }
    self.$.iot.sendBundle(bundle, self.$.iot.NOW_SAFE);
    notifyIoT(self, command);
};

exports.methods = {
    // Methods called by framework
    async __ca_init__() {
        this.$.session.limitQueue(1, APP_SESSION); // only the last notification
        this.$.session.limitQueue(1, IOT_SESSION); // ditto

        this.state.fullName = this.__ca_getAppName__() + '#' +
            this.__ca_getName__();

        // methods called by the iot device
        this.state.trace__iot_sync__ = '__ca_traceSync__';
        this.state.trace__iot_resume__ = '__ca_traceResume__';

        return [];
    },

    async __ca_pulse__() {
        this.$.log && this.$.log.debug('Calling PULSE!');
        this.$.react.render(app.main, [this.state]);
        return [];
    },

    //External methods

    async hello(key, tokenStr) {
        tokenStr && this.$.iot.registerToken(tokenStr);
        key && this.$.react.setCacheKey(key);
        return this.getState();
    },

    async setCurrentScene(name) {
        doBundle(this, 'setCurrentScene', name);
        notifyWebApps(this, 'Set scene');
        return this.getState();
    },

    async getState() {
        this.$.react.coin();
        return [null, this.state];
    },

    // Methods called by the IoT device (Optional)

    // called when the device starts and connects to the CA
    async __ca_traceResume__() {
        notifyWebApps(this, 'New device');
        return [];
    },

    // called when the device syncs state with the cloud
    async __ca_traceSync__() {
        const $$ = this.$.sharing.$;
        const now = (new Date()).getTime();
        this.$.log.debug(this.state.fullName + ':Syncing!!:' + now);
        const currentScene = $$.toCloud.get('currentScene');
        if (currentScene !== this.state.currentScene) {
            this.state.currentScene = $$.toCloud.get('currentScene');
            notifyWebApps(this, 'New inputs');
        }
        this.state.scenes = $$.toCloud.get('scenes');
        return [];
    }

};

caf.init(module);
