import React, { Button, Fragment, useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
//HOme
import Profile from './components/ProfileTab/Profile'
import ThemesComponent from './components/ThemesTab/ThemesComponent'
//Auth 
import SplashScreen from './components/Auth/SplashScreen'
import LoginScreen from './components/Auth/LoginScreen'
import RegisterScreen from './components/Auth/RegisterScreen'
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen'
import Home from './components/HomeTab/Home'
// Roll Call Tab
import RollCallTab from './components/RollCallTab/RollCallTab'
//Theme 
import ThemeDetail from './components/ThemesTab/ThemeDetail'
// Shoptab
import Shop from './components/shopTab/shop'
//FirstLogin
import FirstLogin from './components/FirstLogin/firstLogin'
// Home 
import Lesson from './components/HomeTab/Lesson'
import Test from './components/HomeTab/Test'
// i18n
import I18n from './i18n/i18n';
//
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import { login, setStatus } from './store/user'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthOptions = {
  headerShown: false
}

const settingOptions = {

  headerStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    }
  },
  headerTintColor: '#1a1c20000',
  title: 'Setting',
  headerTitleStyle: {
    fontWeight: 'light',
    fontSize: 20,
    marginLeft: 20
  },
}

const ThemesStack = createStackNavigator();

function ThemesStackScreen() {
  return (
    <ThemesStack.Navigator initialRouteName="ThemeComponent">
      <ThemesStack.Screen name="ThemeComponent" component={ThemesComponent} options={AuthOptions} />
      <ThemesStack.Screen name="ThemeDetail" component={ThemeDetail} options={AuthOptions} />
    </ThemesStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="ThemeComponent">
      <HomeStack.Screen name="Home" component={Home} options={AuthOptions} />
      <HomeStack.Screen name="Lesson" component={Lesson} options={AuthOptions} />
      <HomeStack.Screen name="Test" component={Test} options={AuthOptions} />
      <HomeStack.Screen name="Shop" component={Shop} options={AuthOptions} />
      <HomeStack.Screen name="RollCallTab" component={RollCallTab} options={AuthOptions} />
    </HomeStack.Navigator>
  );
}

function Authen() {
  return (
    <Stack.Navigator
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={AuthOptions} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={AuthOptions} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={AuthOptions} />
    </Stack.Navigator>
  );
}


function mainFlow() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#14274e',
          inactiveTintColor: "#9ba4b4",
          keyboardHidesTabBar: true,
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: '#f1f6f9',
          },
        }}

      >
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: I18n.t('Setting'),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Themes"
          component={ThemesStackScreen}
          options={{
            tabBarLabel: I18n.t('Reading'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="wallpaper" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Home'
          component={HomeStackScreen}
          options={{
            tabBarLabel: I18n.t('Home'),
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="home-circle" color={focused ? "#03c04a" : "tomato"} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="4"
          component={Shop}
          options={{
            tabBarLabel: I18n.t('Shop'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="diamond-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="RollCallTab"
          component={RollCallTab}
          options={{
            tabBarLabel: I18n.t('Mission'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications" color={color} size={26} />
            ),
          }}
        />

      </Tab.Navigator>
  );
}

export default function App(props) {

  const [isLogined, setIsLogined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isUser = useSelector(state => state.user)
  useEffect(() => {
   
    AsyncStorage.getItem('user')
      .then((res) => {
        if (res) {
         
          setIsLogined(true)
        }
        setTimeout(() => {
          setIsLoading(false)
        }, 3000);
      })
      .catch((e) => console.log("e", e))
  })
  // SplashScreen
  return (

    <Fragment>
      {
        isLoading ?
          <SplashScreen /> :
          <NavigationContainer>
            {
              isUser.user || isLogined ? mainFlow() : Authen()
            }
          </NavigationContainer>
      }

    </Fragment>
  )
}
