import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HIGHLIGHT, TEXT_COLOR, BUTTON_CLICKED, BACKGROUND_COLOR, ACCENT } from '../assets/colors'

const CARD_COLOR = 'white'

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const room = useSelector(state => state.room);
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Hello, <Text style={{color: ACCENT}}>{user.name}</Text></Text>
        <Text style={{fontSize: 15, color: TEXT_COLOR}}>Welcome back to, {room.roomName}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.sectional}>
          <Text style={styles.cardHeaderText}>Room Status</Text>
          <Pressable style={({pressed}) => [{backgroundColor: pressed ? BUTTON_CLICKED : CARD_COLOR}, styles.card]} onPress={() => navigation.navigate('Status')}>
            <View style={styles.leftContainer}>
              <Image source={require('../assets/sleepingEmoji.png')} style={styles.emoji}/>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}><Text style={{color: ACCENT}}>Louis</Text> is sleeping</Text>
              {/* <Text>Louis</Text> */}
            </View>
          </Pressable>
        </View>

        <View style={styles.sectional}>
          <Text style={styles.cardHeaderText}>Todos</Text>
          <Pressable style={({pressed}) => [{backgroundColor: pressed ? BUTTON_CLICKED : CARD_COLOR}, styles.card]} onPress={() => navigation.navigate('Todo')}>
            <View style={styles.leftContainer}>
              <Text style={styles.taskNumber}>3</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.taskText}>Tasks Remaining</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.sectional}>
          <Text style={styles.cardHeaderText}>Expenses</Text>
          <Pressable style={({pressed}) => [{backgroundColor: pressed ? BUTTON_CLICKED : CARD_COLOR}, styles.card]} onPress={() => navigation.navigate('Expenses')}>
            <View style={styles.leftContainer}>
              <Text style={styles.moneyNumber}>$324</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.expenseText}>Monthly Expenses</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    paddingTop: '12%'
  },
  headerContainer: {
    height: '25%',
    width: '90%',
    marginTop: '5%',
    marginBottom: '10%',
    backgroundColor: 'white',
    borderRadius: '30%',
    justifyContent: 'center',
    paddingLeft: '5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerText: {
    fontSize: 30,
    color: TEXT_COLOR
  },
  contentContainer: {
    width: '80%',
    height: '45%',
  },
  sectional: {
    flex: 1,
    justifyContent: 'center',
    
  },
  card: {
    width: '100%',
    height: '60%',
    borderRadius: '15%',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
    flexDirection: 'row'
  },
  cardHeaderText: {
    fontSize: 18,
    marginBottom: '1%',
    marginLeft: '5%',
    color: TEXT_COLOR
  },

  /////////////////////////
  ////// FIRST CARD ///////
  /////////////////////////
  emoji: {
    height: '55%',
    width: '55%'
  },
  statusText: {
    fontSize: 20,
    color: TEXT_COLOR
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  statusContainer: {
    flex: 3,
    justifyContent: 'center',
    borderLeftWidth: 1.3,
    borderLeftColor: HIGHLIGHT,
    paddingVertical: '2%',
    paddingLeft: '5%'
  },

  /////////////////////////
  ////// SECOND CARD //////
  /////////////////////////
  taskText: {
    color: TEXT_COLOR,
    fontSize: 20,
  },
  taskNumber: {
    color: ACCENT,
    fontSize: 30
  },

  /////////////////////////
  ////// THIRD CARD ///////
  /////////////////////////
  expenseText: {
    fontSize: 20,
    color: TEXT_COLOR
  },
  moneyNumber: {
    fontSize: 20,
    color: ACCENT,

  },

});
