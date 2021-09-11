import * as actionTypes from './actionTypes';
import mockData from '../mockData.json'

export const initState = {
  coinsData: mockData
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_COINS_DATA:
      const { coinsData } = action.payload;
      return { ...state, coinsData }
    default:
      return state
  }
}
