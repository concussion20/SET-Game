import { createStore } from '@reduxjs/toolkit';
import gameReducer from './GameReducer';

const store = createStore(gameReducer);

export default store;
