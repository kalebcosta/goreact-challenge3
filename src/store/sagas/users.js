import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Creators as UserActions } from '../ducks/users';
import 'react-toastify/dist/ReactToastify.min.css';

export function* userRequest(action) {
  try {
    const { data } = yield call(api.get, `users/${action.user}`);

    const isDuplicated = yield select(state =>
      state.users.data.find(user => user.id === data.id)
    );

    if (isDuplicated) {
      toast.error('Usuário Duplicado', { autoClose: 3000 });
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        login: data.login,
        url: data.html_url,
        avatar: data.avatar_url,
        latitude: action.lat,
        longitude: action.long
      };
      toast.success('Usuário Adicionado', { autoClose: 3000 });
      yield put(UserActions.addUser(userData));
    }
  } catch (err) {
    toast.error('Erro ao adicionar o usuário', { autoClose: 3000 });
  }
}
