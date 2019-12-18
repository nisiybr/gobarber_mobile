import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects'; // delay para teste de loading

import api from '~/services/api';
import { signInSuccess, signFailure, signUpSucess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuario nao pode ser prestador de servicos'
      );
      return;
    }

    // Se deu certo, seta as informacoes que vao ser utilizadas em todas as requisicoes
    // Isso vai ser utilizado para que quando o usuario for autenticado a primeira vez, nao seja mais necessario
    // enviar o token de autenticacao para as rotas da API privadas
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    yield put(signUpSucess());
    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha na cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );

    yield put(signFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    // Se deu certo, seta as informacoes que vao ser utilizadas em todas as requisicoes
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  // toda vez que ele ouvir essa action, vai chamar a da frente
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
