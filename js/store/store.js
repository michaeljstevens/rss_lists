  import { createStore } from 'redux';
  import Reducer from '../reducers/reducer'


const configureStore = (preloadedState = {}) => (
  createStore(
    Reducer,
    preloadedState
  )
);

export default configureStore;