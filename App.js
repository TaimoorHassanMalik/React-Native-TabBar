import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCWnWOgHEHKZlrp-dkcbIEB19XusbVzd_c",
  authDomain: "mysocialapp-taimoor.firebaseapp.com",
  databaseURL: "https://mysocialapp-taimoor.firebaseio.com",
  projectId: "mysocialapp-taimoor",
  storageBucket: "mysocialapp-taimoor.appspot.com",
  messagingSenderId: "131771805206",
  appId: "1:131771805206:web:3d4418abdd14de35528f37"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppContainer = createStackNavigator(
  {
   default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="ios-home" size={32} color={tintColor} />
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="ios-chatboxes" size={32} color={tintColor} />
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            
            tabBarIcon: ({ tintColor }) =>
              <Icon name="ios-add-circle"
                size={45}
                color='#E9446A'
                style={{
                  shadowColor: '#E9446A',
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 10,
                  shadowOpacity: 0.3
                }}
              />
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="ios-notifications" size={32} color={tintColor} />
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="ios-person" size={32} color={tintColor} />
          }
        }
      },
      { 
        defaultNavigationOptions:{
          tabBarOnPress:({navigation, defaultHandler})=>{
            if(navigation.state.key ==="Post"){
              navigation.navigate("postModel")
            }else{
              defaultHandler()
            }
          }

        },
        tabBarOptions: {
          activeTintColor: '#161F3D',
          inactiveTintColor: '#B8BBC4',
          // showLabel: false,
          
        }
      }
   ),
   postModel:{
     screen:PostScreen
   }
  },
  {
    mode:"model",
    headermode:"none",
    // initialRouteName:"postModel"
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);