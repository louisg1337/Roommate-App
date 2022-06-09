import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faHouseChimney, faList, faBell, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { HIGHLIGHT, ACCENT } from './assets/colors';

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
        paddingTop: '4%',
        backgroundColor: HIGHLIGHT,
        borderRadius: '30%',
        height: '10%',
        position: 'absolute',
      },
      tabBarActiveTintColor: 'white',
      tabBarShowLabel: false,
    }}>
      <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return (
            <View style={[{padding: '12%', borderRadius: '30%', backgroundColor: focused ? 'white' : HIGHLIGHT}]}>
              <FontAwesomeIcon icon={faHouseChimney} size={25} color={focused ? HIGHLIGHT : 'white'}/>
            </View>
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
            <View style={[{padding: '12%', borderRadius: '30%', backgroundColor: focused ? 'white' : HIGHLIGHT}]}>
              <FontAwesomeIcon icon={faBell} size={25} color={focused ? HIGHLIGHT : 'white'}/>
            </View>
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
            <View style={[{padding: '12%', borderRadius: '30%', backgroundColor: focused ? 'white' : HIGHLIGHT}]}>
              <FontAwesomeIcon icon={faList} size={25} color={focused ? HIGHLIGHT : 'white'}/>
            </View>
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
            <View style={[{padding: '12%', borderRadius: '30%', backgroundColor: focused ? 'white' : HIGHLIGHT}]}>
              <FontAwesomeIcon icon={faMoneyBill1Wave} size={25} color={focused ? HIGHLIGHT : 'white'}/>
            </View>
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
