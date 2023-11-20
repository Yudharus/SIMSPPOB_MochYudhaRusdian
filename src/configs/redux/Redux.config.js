const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  token: '',
  user: {},
  service: [],
  banner: [],
  isEdit: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TOKEN':
      return {
        ...state,
        token: action.newValue,
      };
    case 'CHANGE_USER':
      return {
        ...state,
        user: action.newValue,
      };
    case 'CHANGE_SERVICE':
      return {
        ...state,
        service: action.newValue,
      };
    case 'CHANGE_BANNER':
      return {
        ...state,
        banner: action.newValue,
      };
    case 'CHANGE_ISEDIT':
      return {
        ...state,
        isEdit: action.newValue,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
