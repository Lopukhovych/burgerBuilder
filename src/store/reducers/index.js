import {combineReducers} from "redux";
import burgerBuilderReducer from "./burgerBuilder";
import orderReducer from "./order";
import authReducer from "./auth";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const rootReducers = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    blacklist: ['auth', 'burgerBuilder', 'order']
};


const pReducer = persistReducer(persistConfig, rootReducers);

export default pReducer;

