import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { ACCENT, BACKGROUND_COLOR, BUTTON_CLICKED, TEXT_COLOR } from '../assets/colors';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { changeStatus } from '../redux/roomSlice';
import { updateStatus } from '../firebase/firestore';

const CardComponent = ({ status, switchStatus, current, room }) => {

  return (
    <View style={styles.cardContainer}>
      <Pressable style={[styles.innerCard, {backgroundColor: status == current ? BUTTON_CLICKED : 'white'}]} onPress={() => switchStatus(status)}>
        <View style={styles.leftContainer}>
          <Image source={
            (status == 'Sleeping') ? 
            require('../assets/sleepingEmoji.png') : 
            (status == 'Occupied') ? 
            require('../assets/occupiedEmoji.png') : 
            (status == "Free") ?
            require('../assets/freeEmoji.png') :
            require('../assets/studyingEmoji.png')
            } style={styles.emoji}/>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </Pressable>
      {status == room.status && <Text>Current Status</Text>}
    </View>
  );
}

export default function Status({ navigation }) {
  const data = ["Free", "Sleeping", "Occupied", "Studying"];
  const room = useSelector((state) => state.room, shallowEqual)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(room.status);

  const switchStatus = (status) => {
    setCurrent(status)
  }

  const asyncAlert = async () => new Promise((resolve) => {
    Alert.alert(
      "Confirm",
      "Changing the status will alert your roommates! Are you sure?",
      [
        {
          text: 'Yes',
          onPress: () => resolve(true),
        },
        {
          text: 'No',
          onPress: () => resolve(false),
          style: 'cancel'
        }
      ]
    )
  })

  const submitStatus = async () => {
    // If status did not change
    if (current == room.status){
      return;
    }
    let confirm = await asyncAlert();
    if (confirm){
      dispatch(changeStatus({status: current, statusName: user.name}));
      updateStatus(current, user.name, room.roomId);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Room Status</Text>
      {data.map((element, index) => {
        return (
          <CardComponent key={index} status={element} switchStatus={switchStatus} current={current} room={room}/>
        )
      })}
      <Pressable style={({pressed}) => [styles.submitButton, {backgroundColor: pressed ? BUTTON_CLICKED : 'rgba(0,0,0,0.0)'}]} onPress={() => {submitStatus()}}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    marginBottom: '10%',
    color: TEXT_COLOR,
  }, 
  submitButton: {
    width: '50%',
    height: '6%',
    borderWidth: 1,
    borderRadius: '30%',
    borderColor: ACCENT,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { 
    fontSize: 20,
    color: ACCENT
  },

  // CARD COMPONENT
  cardContainer: {
    width: '75%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  innerCard: {
    width: '90%',
    height: '65%',
    borderRadius: '30%',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: ACCENT,
  },
  leftContainer: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 2,
    borderLeftWidth: 1,
    borderColor: ACCENT,
    justifyContent: 'center',
    paddingLeft: '5%'
  },
  statusText: {
    fontSize: 25,
    color: TEXT_COLOR
  },
  emoji: {
    width: '46%',
    height: '60%'
  }
});
 