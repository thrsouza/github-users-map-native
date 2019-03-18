import { all, takeLatest } from 'redux-saga/effects';

import { Types as UserTypes } from '~/store/ducks/users';
import { addUser } from './users';

export default function* rootSaga() {
  yield all([takeLatest(UserTypes.ADD_REQUEST, addUser)]);
}
