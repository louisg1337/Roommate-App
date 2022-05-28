import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

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
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Todo" component={Todo} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function AuthNav(){
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Signin" component={Signin} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

const auth = true;

function App() {
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
