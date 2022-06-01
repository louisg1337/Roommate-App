import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../firebase/auth';
import { initializeRoom } from '../redux/roomSlice';

export default function Home() {
  const dispatch = useDispatch();
  const room = useSelector(state => state.room);
  const user = useSelector(state => state.user)

  const testData = {
    roomId: Math.random(), 
    roomName: "Yesssirrr", 
    roommates: [{name: 'Louis', id: '69'}, {name: 'Michael', id: '12'}]
  }

  return (
    <View style={styles.container}>
      <Text>Hello Home Screen</Text>
      <Pressable style={{padding: 10, borderWidth: 1}} onPress={() => dispatch(initializeRoom(testData))}>
        <Text>Add Room</Text>
      </Pressable>
      <Pressable style={{padding: 10, borderWidth: 1, marginTop: 20}} onPress={() => console.log(room)}>
        <Text>State</Text>
      </Pressable>
      <Pressable style={{padding: 10, borderWidth: 1, marginTop: 20}} onPress={() => signOutUser()}>
        <Text>Sign Out</Text>
      </Pressable>
      <Text>Hello {user.name} {user.id}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
