import { createStore, combineReducers, applyMiddleware, compose } from "redux";import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleWare = [thunk];

const rootReducers = combineReducers({
    market: marketReducer,
    ui: uiReducer,
  });

const store = createStore(
  rootReducers,
  initialState,
  compose(applyMiddleware(...middleWare),composeWithDevTools())
);

export default store;
