'use strict';

const React = require('react');
const rB = require('react-bootstrap');
const cE = React.createElement;
const AppActions = require('../actions/AppActions');
const url = require('url');

class Finder extends React.Component {

    constructor(props) {
        super(props);
        this.handleDaemon = this.handleDaemon.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.doConnect = this.doConnect.bind(this);
        this.doDisconnect = this.doDisconnect.bind(this);
        this.doURL = this.doURL.bind(this);
    }

    handleAddress(ev) {
        AppActions.setAddress(this.props.ctx, ev.target.value);
    }

    handlePassword(ev) {
        AppActions.setPassword(this.props.ctx, ev.target.value);
    }

    doConnect() {
        AppActions.connect(this.props.ctx, this.props.address,
                           this.props.password);
    }

    doDisconnect() {
        AppActions.disconnect(this.props.ctx);
    }

    doURL() {
        AppActions.setLocalState(this.props.ctx, {displayURL: true});
    }

    handleDaemon(e) {
        AppActions.setBrowserDaemon(this.props.ctx, e);
    }

    render() {
        const getURL = () => {
            if ((typeof window !== 'undefined') && window.location) {
                const parsedURL = url.parse(window.location.href);
                delete parsedURL.search; // no cache
                parsedURL.pathname = 'index-iot.html';
                return url.format(parsedURL);
            } else {
                // server-side rendering
                return null;
            }
        };

        return cE(rB.Form, {horizontal: true},
                  cE(rB.FormGroup, {controlId: 'findControlId'},
                     cE(rB.Col, {sm:6, xs: 12},
                        cE(rB.ControlLabel, null, 'Browser Daemon')
                       ),
                     cE(rB.Col, {sm:6, xs: 12},
                        cE(rB.ToggleButtonGroup, {
                            type: 'radio',
                            name : 'daemon',
                            value: this.props.daemon,
                            onChange: this.handleDaemon
                        },
                           cE(rB.ToggleButton, {value: 0}, 'Off'),
                           cE(rB.ToggleButton, {value: 1}, 'On')
                          )
                       )
                    ),
                  cE(rB.FormGroup, {controlId: 'findControlId3'},
                     cE(rB.Col, {sm:6, xs: 12},
                        cE(rB.ControlLabel, null, 'Address')
                       ),
                     cE(rB.Col, {sm:6, xs: 12},
                        cE(rB.FormControl, {
                            type: 'text',
                            value: this.props.address,
                            placeholder: 'localhost:4444',
                            onChange: this.handleAddress
                        })
                       )
                    ),
                   cE(rB.FormGroup, {controlId: 'findControlId4'},
                     cE(rB.Col, {sm:6, xs: 12},
                        cE(rB.ControlLabel, null, 'Password')
                       ),
                     cE(rB.Col, {sm:6, xs: 12},
                        cE(rB.FormControl, {
                            type: 'password',
                            value: this.props.password,
                            onChange: this.handlePassword
                        })
                       )
                    ),
                  cE(rB.FormGroup, {controlId: 'findControl2Id'},
                     cE(rB.Col, {sm:6, xs: 12},
                        cE(rB.ControlLabel, null, this.props.connected ?
                           'Connected' : 'Disconnected')
                       ),
                     cE(rB.ButtonGroup, null,
                        [
                            (this.props.connected ?
                             cE(rB.Button, {
                                 bsStyle: 'danger',
                                 key: 423,
                                 onClick: this.doDisconnect
                             }, 'Disconnect') :
                             cE(rB.Button, {
                                 bsStyle: 'danger',
                                 key: 323,
                                 onClick: this.doConnect
                             }, 'Connect')
                            ),
                            cE(rB.Button, {
                                bsStyle: 'primary',
                                key: 523,
                                onClick: this.doURL
                            }, 'URL')
                        ]
                       )
                    ),
                  this.props.daemon && (typeof window !== 'undefined') ?
                  cE(rB.FormGroup, {controlId: 'iframeId'},
                     cE('iframe', {
                         // disable top-navigation
                         sandbox: 'allow-same-origin allow-popups ' +
                             'allow-scripts allow-forms allow-pointer-lock',
                         frameBorder: 0,
                         style: {maxHeight: '0px'},
                         src: getURL()
                     }, null)) :
                  cE('div', null)
                 );
    }
}

module.exports = Finder;
