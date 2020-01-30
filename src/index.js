import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import './config/ReactotronConfig';

import { store, persistor } from '~/store';
import App from '~/App';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('accc4ef3-ac72-40cc-9c62-a0b93ae5f09a');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIDs);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIDs);
  }

  // vai ser disparado toda ve que o user receber uma notificacao push e o app estiver aberto
  // dentro do data vai vir todas as configuracoes e informacoes da notificacao
  onReceived = data => {};

  // quando a gente clica na notificacao e a app esta fechada e o aplicativo abre
  onOpened = notification => {};

  // quando o usuario faz um registro no servico de notificacoes
  // relaciona o email que esta logado no app -> id de registro de notificacao
  // um email pode ter mais de um id de notificacao, quando ele se loga em tres aparelhos com uma mesma conta por ex.
  onReceived = id => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
