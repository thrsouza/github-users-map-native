/**
 * Types
 */
export const Types = {
  SHOW: 'modal/SHOW',
  HIDE: 'modal/HIDE',
};

/**
 * REDUCER
 */
const INITIAL_STATE = {
  visible: false,
  coordinates: null,
};

export default function modal(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.SHOW: {
      return {
        visible: true,
        coordinates: payload.coordinates,
      };
    }
    case Types.HIDE: {
      return {
        visible: false,
        coordinates: null,
      };
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
  showModal: ({ coordinates }) => ({
    type: Types.SHOW,
    payload: { coordinates },
  }),
  hideModal: () => ({
    type: Types.HIDE,
  }),
};
