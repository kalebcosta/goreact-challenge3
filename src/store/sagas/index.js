import { all, takeLatest } from 'redux-saga/effects';
import { userRequest } from './users';

import { Types as UserTypes } from '../ducks/users';

export default function* rootSaga() {
  yield all([takeLatest(UserTypes.USER_REQUEST, userRequest)]);
}
