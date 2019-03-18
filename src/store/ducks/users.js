import { AsyncStorage } from 'react-native';

/**
 * TYPES
 */
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ADD_FAILURE: 'users/ADD_FAILURE',
  REMOVE: 'users/REMOVE',
};

/**
 * REDUCER
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  result: null,
};

export default function users(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.ADD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case Types.ADD_SUCCESS: {
      const stateResult = {
        data: [...state.data, payload.data],
        loading: false,
        result: payload.result,
      };

      AsyncStorage.setItem('@app/users', JSON.stringify(stateResult));
      return stateResult;
    }
    case Types.ADD_FAILURE: {
      return { ...state, loading: false, result: payload.result };
    }
    case Types.REMOVE: {
      const stateResult = {
        ...state,
        data: state.data.filter(user => payload.id !== user.id),
      };

      AsyncStorage.setItem('@app/users', JSON.stringify(stateResult));
      return stateResult;
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
  addUserRequest: (user, coordinates) => ({
    type: Types.ADD_REQUEST,
    payload: { user, coordinates },
  }),
  addUserSuccess: (data, result) => ({
    type: Types.ADD_SUCCESS,
    payload: { data, result },
  }),
  addUserFailure: result => ({
    type: Types.ADD_FAILURE,
    payload: { result },
  }),
  removeUser: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),
};
