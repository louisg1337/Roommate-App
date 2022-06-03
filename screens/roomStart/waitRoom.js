import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
Platform } from 'react-native';
import { initData, joinRoom } from '../../firebase/firestore';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { initializeRoom } from '../../redux/roomSlice';
import { initializeUser } from '../../redux/userSlice';

export default function WaitRoom({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        console.log('//////////////// NEW LOAD ////////////////')
        initData().then((result) => {
            console.log(result)
            // Data: [boolean, userData, roomData(?)]
            dispatch(initializeUser(result[1]));

            if (result[0]){
                // If in room
                dispatch(initializeRoom(result[2]));
                navigation.replace('Main');
            } else {
                // Not in room
                setLoading(false);
            }
        })

        setLoading(false)

        return () => {
            setLoading(true)
        }
    }, []);

    const findRoom = () => {
        joinRoom(code, user).then((response) => {
            if (response) {
                dispatch(initializeRoom(response));
                navigation.replace("Main");
            } else {
                alert("Unable to find room!");
            }
        })
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='red' />
            </View>
        );
    } else {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.choiceContainer} >
                        <View style={[styles.innerContainer, {borderBottomWidth: 1}]}>
                            <TextInput
                            style={styles.codeInput}
                            placeholder="X X X X X X"
                            value={code}
                            onChangeText={setCode}
                            autoCapitalize={"characters"}
                            autoCorrect={false}
                            maxLength={6}
                            />
                            <Pressable 
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? 'gold' : 'white'
                                }, 
                                styles.codeButton
                            ]}
                            disabled={code.length < 6 ? true : false}
                            onPress={() => findRoom()}
                            >
                                <Text style={{fontSize: 20}}>{code.length < 6 ? "Enter Code" : "Submit"}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.innerContainer}>
                            <Pressable 
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? 'gold' : 'white'
                                }, 
                                styles.createRoomButton
                            ]}
                            onPress={() => navigation.navigate('Create')}
                            >
                                <Text style={{fontSize: 30}}>Create Room</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    choiceContainer: {
        width: '80%',
        height: '45%',
        marginTop: '50%'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    createRoomButton: {
        width: '90%',
        borderRadius: '30%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%'
    },
    codeInput: {
        borderBottomWidth: 1,
        fontSize: 25,
        width: '60%',
        marginBottom: '5%',
        textAlign: 'center',
        paddingBottom: '2%'
    },
    codeButton: {
        borderWidth: 1,
        borderRadius: '20%',
        paddingHorizontal: '8%',
        paddingVertical: '3%'
    }
});
