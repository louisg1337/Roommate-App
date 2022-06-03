import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Redux
import { Provider, useSelector } from 'react-redux';
import { selectRoom } from './redux/roomSlice';
import store from './redux/store';

// Firebase
import { authObserver } from './firebase/auth';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from './screens/home';
import Todo from './screens/todo';
import SignIn from './screens/auth/signIn';
import SignUp from './screens/auth/signUp';
import WaitRoom from './screens/roomStart/waitRoom';
import CreateRoom from './screens/roomStart/createRoom';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RoomStack = createNativeStackNavigator();

const HomeNav = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Todo" component={Todo} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

const RoomNav = () => {
  return (
    <RoomStack.Navigator initialRouteName="Room">
      <RoomStack.Screen name="Room" component={WaitRoom} options={{headerShown: false}}/>
      <RoomStack.Screen name="Create" component={CreateRoom} options={{title: 'Create Room'}}/>
      <RoomStack.Screen name="Main" component={HomeNav} options={{headerShown: false}}/>
    </RoomStack.Navigator>
  )
}

const AuthNav = () => {
  return (
    <Stack.Navigator initialRouteName='SignUp'>
      <Stack.Screen name = "SignUp" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name = "SignIn" component={SignIn} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

const App = () => {
  const auth = authObserver()

  return (
    <Provider store={store}>
        <NavigationContainer>
          {auth ? 
            RoomNav()
          :
            AuthNav()
          }
      </NavigationContainer>
    </Provider>
  )
}

export default App;
