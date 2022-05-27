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
const temp = true;

function AuthNav(){
  if (temp) {
    return (
      HomeNav()
    )
  } else {
    return (
      AuthNav()
    )
  }
}



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
