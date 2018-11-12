import createSagaMiddleware from 'redux-saga';
import {watchAuth} from './auth';
import {watchBurgerBuilder} from './burgerBuilder';
import {watchOrder} from './order';
import {watchHelp} from './help';

const sagaMiddleware = createSagaMiddleware();

export const runSagas = ()  => {
    sagaMiddleware.run(watchAuth);
    sagaMiddleware.run(watchBurgerBuilder);
    sagaMiddleware.run(watchOrder);
    sagaMiddleware.run(watchHelp);
};

export default sagaMiddleware;
