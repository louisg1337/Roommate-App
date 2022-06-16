import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createRoom } from '../../firebase/firestore';

// Redux
import { initializeRoom } from '../../redux/roomSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function CreateRoom({ navigation }) {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const create = () => {
        if (name == ""){
            alert("Please add a name!");
            return;
        }

        createRoom(user, name).then((roomData) => {
            console.log(roomData)
            dispatch(initializeRoom(roomData));
            navigation.replace('Main');
        }).catch((e) => {
            alert("Oh no! Something went wrong! " + e.message)
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                    placeholder='Room Name'
                    style={styles.inputStyle}        
                    onChangeText={setName}
                    value={name}
                    />
                    <Pressable 
                        onPress={() => create()}
                        style={({ pressed }) => [
                            {
                            backgroundColor: pressed
                                ? 'gold'
                                : 'white'
                            },
                            styles.button
                        ]}
                    >
                        <Text style={{fontSize: 25}}>Create</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    marginTop: '40%',
    marginBottom: '15%'
  },
  form: {
      width: '80%',
      height: '40%',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '50%',
      borderRadius: 20
  },
  inputStyle: {
    width: '80%',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 20,
    marginTop: '5%',
  },
  button: {
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: '9%',
    paddingVertical: '4%',
    marginTop: '10%'
  }
});
