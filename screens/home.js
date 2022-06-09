import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HIGHLIGHT, TEXT_COLOR } from '../assets/colors'


export default function Home() {
  const dispatch = useDispatch();
  const room = useSelector(state => state.room);
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Hello, <Text style={{color: HIGHLIGHT}}>{user.name}</Text></Text>
          <Text style={{fontSize: 15, color: TEXT_COLOR}}>Welcome back to, {room.roomName}</Text>
        </View>
        <View style={styles.sectional}>
          <Text style={styles.cardHeaderText}>Room Status</Text>
          <Pressable style={[styles.card, {backgroundColor: '#AFCEA1'}]}>
            <View style={styles.emojiContainer}>
              <Image source={require('../assets/sleepingEmoji.png')} style={styles.emoji}/>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}><Text style={{color: HIGHLIGHT}}>Louis</Text> is sleeping</Text>
              {/* <Text>Louis</Text> */}
            </View>
          </Pressable>
        </View>
        <View style={styles.sectional}>
          <Text style={styles.cardHeaderText}>Tasks</Text>
          <Pressable style={[styles.card, {backgroundColor: '#A8C6DC'}]}>
            <Text style={styles.taskText}>3 Tasks Remaining</Text>
          </Pressable>
        </View>
        <View style={styles.sectional}>
          <Text style={styles.cardHeaderText}>Expenses</Text>
          <Pressable style={[styles.card, {backgroundColor: '#d8b0ff'}]}>

          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0EE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '12%'
  },
  headerContainer: {
    flex: 1,
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
    height: '80%',
    
  },
  sectional: {
    flex: 1,
    justifyContent: 'center',
    
  },
  card: {
    width: '100%',
    height: '60%',
    borderRadius: '15%',
    backgroundColor: '#F5F6F7',
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
    height: '50%',
    width: '65%'
  },
  statusText: {
    fontSize: 20,
    color: TEXT_COLOR
  },
  emojiContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  statusContainer: {
    flex: 3,
    justifyContent: 'center',
    borderLeftWidth: 1.3,
    borderLeftColor: TEXT_COLOR,
    paddingVertical: '2%',
    paddingLeft: '5%'
  },

  /////////////////////////
  ////// SECOND CARD //////
  /////////////////////////
  taskText: {
    color: TEXT_COLOR,
    fontSize: 25,
    paddingLeft: '5%'
  }


});
