import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';
import { Creators as UserActions } from '~/store/ducks/users';

export function* addUser({ payload }) {
  try {
    const { data } = yield call(api.get, `/users/${payload.user}`);

    const isDuplicated = yield select((state) => {
      const { data: users } = state.users;
      return users.find(user => user.id === data.id);
    });

    if (isDuplicated) {
      const result = {
        message: 'The user already exists!',
      };

      yield put(UserActions.addUserFailure(result));
    } else {
      const userData = {
        id: data.id,
        name: data.name || data.login,
        bio: data.bio || '- User bio is undefined. :(',
        login: data.login,
        avatar: data.avatar_url,
        coordinates: payload.coordinates,
      };

      const result = {
        message: 'Successful operation!',
      };

      yield put(UserActions.addUserSuccess(userData, result));
    }
  } catch (error) {
    const result = {
      message: 'There was an error adding a new user!',
    };

    yield put(UserActions.addUserFailure(result));
  }
}
