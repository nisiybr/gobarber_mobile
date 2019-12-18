// eh o arquivo que se importa na tela, para chamar uma action para alterar o state
// pode ser chamado por outros reducers tambem, ou saga.

export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data }, // o que nao eh o type, vem dentro de payload
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile }, // o que nao eh o type, vem dentro de payload
  };
}
export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
