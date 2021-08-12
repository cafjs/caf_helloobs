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
        this.doURL = this.doURL.bind(this);
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
                   cE(rB.FormGroup, {controlId: 'findControl2Id'},
                      cE(rB.Col, {sm:6, xs: 12},
                         cE(rB.ControlLabel, null, 'Share')
                        ),
                      cE(rB.Col, {sm:6, xs: 12},
                         cE(rB.Button, {
                            bsStyle: 'primary',
                            onClick: this.doURL
                         }, 'URL')
                        )
                     ),
                  this.props.daemon && (typeof window !== 'undefined') ?
                  cE(rB.FormGroup, {controlId: 'iframeId'},
                     cE('iframe', {
                         // disable top-navigation
                         sandbox: 'allow-same-origin allow-popups ' +
                             'allow-scripts allow-forms allow-pointer-lock',
                         frameBorder: 8,
                         style: {maxHeight: '85px'},
                         src: getURL()
                     }, null)) :
                  cE('div', null)
                 );
    }
}

module.exports = Finder;
