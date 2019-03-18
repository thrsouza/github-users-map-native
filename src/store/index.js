import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

const { tron: Reactotron } = console;

const middlewares = [];

const sagaMonitor = Reactotron ? Reactotron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const tronMiddleware = Reactotron ? Reactotron.createEnhancer : null;

middlewares.push(sagaMiddleware);

const store = tronMiddleware
  ? createStore(
    reducers,
    compose(
      tronMiddleware(),
      applyMiddleware(...middlewares),
    ),
  )
  : createStore(reducers, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(sagas);

export default store;
