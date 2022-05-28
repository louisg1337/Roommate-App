import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoom } from '../redux/userSlice';

export default function Home() {
  const dispatch = useDispatch();
  const userRedux = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text>Hello Home Screen</Text>
      <Pressable style={{padding: 10, borderWidth: 1}} onPress={() => dispatch(updateRoom({roomId: Math.random()}))}>
        <Text>Add Room</Text>
      </Pressable>
      <Pressable style={{padding: 10, borderWidth: 1, marginTop: 20}} onPress={() => console.log(userRedux)}>
        <Text>State</Text>
      </Pressable>
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
