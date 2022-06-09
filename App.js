import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faHouseChimney, faList, faBell, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { HIGHLIGHT } from './assets/colors';

// Redux
import { Provider, useSelector } from 'react-redux';
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
import Status from './screens/status';
import Expenses from './screens/expenses';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RoomStack = createNativeStackNavigator();


const HomeNav = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarStyle: {
        backgroundColor: '#F3F0EE',
        borderWidth: 0,
      },
      tabBarActiveTintColor: HIGHLIGHT
    }}>
      <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return (
            <FontAwesomeIcon icon={faHouseChimney} size={30} color={focused ? HIGHLIGHT : 'gray'}/>
          )
        }
      }} 
      />
      <Tab.Screen 
      name="Status" 
      component={Status} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return (
            <FontAwesomeIcon icon={faBell} size={30} color={focused ? HIGHLIGHT : 'gray'}/>
          )
        }
      }}
      />
      <Tab.Screen 
      name="Todo" 
      component={Todo} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return (
            <FontAwesomeIcon icon={faList} size={25} color={focused ? HIGHLIGHT : 'gray'}/>
          )
        }
      }} 
      />
      <Tab.Screen 
      name="Expenses" 
      component={Expenses} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return (
            <FontAwesomeIcon icon={faMoneyBill1Wave} size={30} color={focused ? HIGHLIGHT : 'gray'}/>
          )
        }
      }}
      />
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
