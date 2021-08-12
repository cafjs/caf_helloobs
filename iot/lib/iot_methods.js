'use strict';

const myUtils = require('caf_iot').caf_components.myUtils;

exports.methods = {
    async __iot_setup__() {
        this.state.currentScene =  this.$.obs.getCurrentScene();
        this.$.obs.setHandleSceneChanged('__iot_handle_change_scene');
        return [];
    },

    async __iot_loop__() {
        const now = (new Date()).getTime();
        this.$.log && this.$.log.debug(now + ' loop:');
        this.$.log && this.$.log.debug(
            'Time offset ' +
                (this.$.cloud.cli && this.$.cloud.cli.getEstimatedTimeOffset())
        );

        if (this.toCloud.get('currentScene') !== this.state.currentScene) {
            this.toCloud.set('currentScene', this.state.currentScene);
        }

        const scenes = this.$.obs.getScenes();
        if (!myUtils.deepEqual(this.toCloud.get('scenes'), scenes)) {
            this.toCloud.set('scenes', scenes);
        }
        return [];
    },

    async setCurrentScene(name) {
        this.$.obs.setCurrentScene(name);
        return [];
    },

    async __iot_handle_change_scene(name) {
        this.$.log && this.$.log.debug(`Change scene to ${name}`);
        this.state.currentScene = name;
        return [];
    }

};
