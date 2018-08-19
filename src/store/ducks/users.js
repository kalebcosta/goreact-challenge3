import { createActions, createReducer } from 'reduxsauce';

/**
 * ACTION TYPES & CREATORS
 */
export const { Types, Creators } = createActions({
  userRequest: ['user', 'lat', 'long'],
  addUser: ['user'],
  removeUser: ['id']
});

const INITIAL_STATE = {
  data: []
};

/**
 *
 * REDUCERS
 */
const req = (state = INITIAL_STATE) => ({ ...state });
const add = (state = INITIAL_STATE, action) => ({
  ...state,
  data: [...state.data, action.user]
});
const remove = (state = INITIAL_STATE, action) => ({
  ...state,
  data: state.data.filter(user => user.id !== action.id)
});

export default createReducer(INITIAL_STATE, {
  [Types.ADD_USER]: add,
  [Types.REMOVE_USER]: remove,
  [Types.USER_REQUEST]: req
});
