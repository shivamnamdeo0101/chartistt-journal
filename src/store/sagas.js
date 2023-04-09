import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { TRADE_API } from '../service/TradeService'
import { setTradeList } from './DataSlice'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTrades(action) {
  try {
    const trades = yield call(TRADE_API.getAllTrades, action.payload.userId)
    yield put(setTradeList(trades?.data?.data))
  } catch (e) {
    console.log*e
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* getTradeSaga() {
  yield takeEvery('TRADES_FETCH_REQUESTED', fetchTrades)
}

// /*
//   Alternatively you may use takeLatest.

//   Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */
// function* mySaga() {
//   yield takeLatest('USER_FETCH_REQUESTED', fetchTrades)
// }

export default getTradeSaga