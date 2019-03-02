import React from 'react';
import { Notifications } from 'expo'
import { Alert } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AsyncStorage } from 'react-native'

import configureStore from './src/store'
const { persistor, store } = configureStore()

import MainNavigator from './src/navigation/MainNavigator';
import registerForNotifications from './src/services/PushNotifications'

class App extends React.Component {
  async componentDidMount() {
    await AsyncStorage.removeItem('pushtoken')
    registerForNotifications()

    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'ok' }]
        )
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
