import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Redux
import { Provider } from 'react-redux';
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeNav(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Todo" component={Todo} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

function AuthNav(){
  return (
    <Stack.Navigator initialRouteName='SignUp'>
      <Stack.Screen name = "SignUp" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name = "SignIn" component={SignIn} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function App() {
  const auth = authObserver()

  return (
    <Provider store={store}>
      <NavigationContainer>
        {auth ? 
          HomeNav()
        :
          AuthNav()
        }
      </NavigationContainer>
    </Provider>
  )
}

export default App;




// if (loading) {
//   return (
//     <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//       <ActivityIndicator size="large" color="#00ff00" />
//     </View>
//   )
// } else {