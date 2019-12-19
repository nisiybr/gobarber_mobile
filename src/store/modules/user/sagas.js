import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data; // eslint-disable-line

    const profile = Object.assign( // eslint-disable-line
      // serve para unir dois objetos
      { name, email, }, // eslint-disable-line
      // se no restante das informacoes eu tiver oldPassword preenchido
      // quer dizer que o usuario preencheu a senha atual e quer preencher o restante
      // se eu tiver algo em oldPassword, entao carrego o restante
      rest.oldPassword ? rest : {} // eslint-disable-line
    ); // eslint-disable-line

    const response = yield call(api.put, 'users', profile);
    Alert.alert('Perfil Atualizado', 'O perfil foi atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Erro na Atualizacao',
      'O perfil nao foi atualizado, verifique os dados'
    );

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
