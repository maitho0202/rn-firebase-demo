import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Home'); 
            }
        })

        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with: ', user.email);
            })
            .catch(error => alert(error.message));
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email);
            })
            .catch(error => alert(error.message));
    }

    return (
        <View
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => { setEmail(text) }}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Passoword'
                    value={password}
                    onChangeText={(text) => { setPassword(text) }}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleLogin}
                >
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.btnOutline]}
                    onPress={handleSignUp}
                >
                    <Text style={styles.btnOutlineText}>Register</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    btnContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    btn: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnOutline: {
        backgroundColor: 'white',
        marginTop: 15,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    btnOutlineText: {
        color: '#0782F9',
        fontSize: 16,
        fontWeight: '700',
    },
})