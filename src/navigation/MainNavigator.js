import React from 'react'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { Icon } from 'react-native-elements';

import AuthScreen from '../screens/AuthScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import MapScreen from '../screens/MapScreen'
import DeckScreen from '../screens/DeckScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ReviewScreen from '../screens/ReviewScreen'

export const MainNavigator = createBottomTabNavigator({
  welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  auth: {
    screen: AuthScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  main: {
    screen: createBottomTabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      review: {
        screen: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen,
        }),
        navigationOptions: {
          title: 'Review Jobs',
          tabBarIcon: ({ tintColor }) => { return <Icon name="favorite" size={30} color={tintColor} /> }
        }
      }
    }, {
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      }),
    navigationOptions: {
      tabBarVisible: false
    }
  }
}
);

export default createAppContainer(MainNavigator);
