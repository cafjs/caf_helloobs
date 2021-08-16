'use strict';

const React = require('react');
const rB = require('react-bootstrap');
const AppActions = require('../actions/AppActions');
const AppStatus = require('./AppStatus');

const DisplayError = require('./DisplayError');
const DisplayURL = require('./DisplayURL');

const Finder = require('./Finder');
const Scenes = require('./Scenes');

const cE = React.createElement;

class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.ctx.store.getState();
    }

    componentDidMount() {
        if (!this.unsubscribe) {
            this.unsubscribe = this.props.ctx.store
                .subscribe(this._onChange.bind(this));
            this._onChange();
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    _onChange() {
        if (this.unsubscribe) {
            this.setState(this.props.ctx.store.getState());
        }
    }

    render() {

        const title = 'OBS Virtual Camera';

        return cE('div', {className: 'container-fluid'},
                  cE(DisplayError, {
                      ctx: this.props.ctx,
                      error: this.state.error
                  }),
                  cE(DisplayURL, {
                      ctx: this.props.ctx,
                      displayURL: this.state.displayURL
                  }),
                  cE(rB.Panel, null,
                     cE(rB.Panel.Heading, null,
                        cE(rB.Panel.Title, null,
                           cE(rB.Grid, {fluid: true},
                              cE(rB.Row, null,
                                 cE(rB.Col, {sm:1, xs:1},
                                    cE(AppStatus, {
                                        isClosed: this.state.isClosed
                                    })
                                   ),
                                 cE(rB.Col, {
                                     sm: 5,
                                     xs:10,
                                     className: 'text-right'
                                 }, 'HelloOBS'),
                                 cE(rB.Col, {
                                     sm: 5,
                                     xs:11,
                                     className: 'text-right'
                                 }, this.state.fullName)
                                )
                             )
                          )
                       ),
                     cE(rB.Panel.Body, null,
                        cE(rB.Panel, null,
                           cE(rB.Panel.Heading, null,
                              cE(rB.Panel.Title, null, title)
                             ),
                           cE(rB.Panel.Body, null,
                              cE(Finder, {
                                  ctx: this.props.ctx,
                                  daemon: this.state.daemon,
                                  password: this.state.password,
                                  address: this.state.address,
                                  connected: this.state.connected
                              })
                             )
                          ),
                        cE(rB.Panel, null,
                           cE(rB.Panel.Heading, null,
                              cE(rB.Panel.Title, null, 'Scenes')
                             ),
                           cE(rB.Panel.Body, null,
                              cE(Scenes, {
                                  ctx: this.props.ctx,
                                  currentScene: this.state.currentScene,
                                  scenes: this.state.scenes
                              })
                             )
                          )
                       )
                    )
                 );
    }
};

module.exports = MyApp;
