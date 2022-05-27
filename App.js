import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from './screens/home';
import Todo from './screens/todo';

import Signin from './screens/signin';


const Tab = createBottomTabNavigator();

function HomeNav(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Todo" component={Todo} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function AuthNav(){
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Signin" component={Signin} />
    </Stack.Navigator>
  );
}

const temp = true;

function App() {
  return (
    <NavigationContainer>
      {temp ? 
        HomeNav()
      :
        AuthNav()
      }
    </NavigationContainer>
  )
}

export default App;
