'use strict';

const React = require('react');
const rB = require('react-bootstrap');
const cE = React.createElement;
const AppActions = require('../actions/AppActions');

class Scenes extends React.Component {

    constructor(props) {
        super(props);
        this.handleScene = this.handleScene.bind(this);
    }

    handleScene(e) {
        const sortedScenes = this.props.scenes.sort();
        const newScene = sortedScenes[e];
        if (newScene) {
            AppActions.setCurrentScene(this.props.ctx, newScene);
        } else {
            AppActions.setError(this.props.ctx,
                                new Error(`Invalid index ${e}`));
        }
    }

    render() {
        const sortedScenes = this.props.scenes.sort();
        const index = sortedScenes
            .findIndex(x => (x === this.props.currentScene));

        const buttons = sortedScenes.map((x, i) => cE(rB.ToggleButton,
                                                      {value: i, keys: 2*i},
                                                      x));

        return cE(rB.ToggleButtonGroup, {
            type: 'radio',
            name: 'scenes',
            value: index,
            vertical: true,
            onChange: this.handleScene
        }, buttons);
    }
}

module.exports = Scenes;
