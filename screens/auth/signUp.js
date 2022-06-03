import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createUser } from '../../firebase/auth';

export default function SignUp({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpUser = async () => {
        if (name != "" && email != "" && password != ""){
            createUser(name, email, password)
        } else {
            alert("Please fill out all fields!");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Sign Up</Text>
                <View style={styles.form}>
                    <TextInput
                    placeholder='Name'
                    style={styles.inputStyle}
                    onChangeText={setName}
                    value={name}        
                    />
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
                        onPress={() => signUpUser()}
                        style={({ pressed }) => [
                            {
                            backgroundColor: pressed
                                ? 'gold'
                                : 'white'
                            },
                            styles.button
                        ]}
                    >
                        <Text style={{fontSize: 25}}> Sign Up!</Text>
                    </Pressable>
                </View>
                <Pressable style={{marginTop: 20}} onPress={() => navigation.navigate('SignIn')}>
                    <Text>Have an account? Sign in!</Text>
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
