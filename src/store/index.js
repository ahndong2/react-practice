import { createStore, combineReducers } from 'redux';
import spinner from './reducer/spinner/Spinner';

const combine = combineReducers({
  spinner,
});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(combine, devTools);

export default store;
