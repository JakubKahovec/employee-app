import { createHashHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { RootAction, RootState, Services } from "typesafe-actions";

import { routerMiddleware } from "connected-react-router";
import services from "../services";
import rootEpic from "./RootEpic";
import createRootReducer from "./RootReducer";

export const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const history = createHashHistory();

export const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
  dependencies: services,
});

const middlewares = [epicMiddleware, routerMiddleware(history)];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const initialState = {};

const store = createStore(createRootReducer(history), initialState, enhancer);

epicMiddleware.run(rootEpic);

export default store;
