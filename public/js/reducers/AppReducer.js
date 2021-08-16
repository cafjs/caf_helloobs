const AppConstants = require('../constants/AppConstants');

const AppReducer = function(state, action) {
    if (typeof state === 'undefined') {
        return  {currentScene: '', scenes: [], isClosed: false, daemon: false,
                 displayUser: false, displayURL: false, error: null,
                 address: 'localhost:4444', password: 'obs', connected: false};
    } else {
        switch(action.type) {
        case AppConstants.APP_UPDATE:
        case AppConstants.APP_NOTIFICATION:
            return Object.assign({}, state, action.state);
        case AppConstants.APP_ERROR:
            return Object.assign({}, state, {error: action.error});
        case AppConstants.WS_STATUS:
            return Object.assign({}, state, {isClosed: action.isClosed});
        default:
            return state;
        }
    };
};

module.exports = AppReducer;
