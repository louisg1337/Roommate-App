import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { signInUser } from '../../firebase/auth';

// Redux
import { initializeUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const signIn = async () => {
        if (email != "" && password != ""){
            signInUser(email, password).then((user) => {
                dispatch(initializeUser({name: user.displayName, id: user.uid}))
            })
        } else {
            alert("Please fill out all fields!");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Sign In</Text>
                <View style={styles.form}>
                    <TextInput
                    placeholder='Email'
                    style={styles.inputStyle}        
                    onChangeText={setEmail}
                    value={email}
                    keyboardType={'email-address'}
                    />
                    <TextInput
                    placeholder='Password'
                    style={styles.inputStyle}   
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}   
                    />
                    <Pressable 
                        onPress={() => signIn()}
                        style={({ pressed }) => [
                            {
                            backgroundColor: pressed
                                ? 'gold'
                                : 'white'
                            },
                            styles.button
                        ]}
                    >
                        <Text style={{fontSize: 25}}> Sign In!</Text>
                    </Pressable>
                </View>
                <Pressable style={{marginTop: 20}} onPress={() => navigation.navigate('SignUp')}>
                    <Text>Don't have an account? Sign up!</Text>
                </Pressable>
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
      justifyContent: 'center'
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
    padding: '5%',
    marginTop: '10%'
  }
});
