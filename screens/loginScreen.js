import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

import ActionButton from '../components/misc/actionButton';
import TextEntry from '../components/misc/textEntry';

import { AuthContext } from '../helpers/globals';

import { ValidateEmpty } from '../helpers/validators';



const bigWidth = '90%';

export default function LogInScreen({ navigation }){

    const { SaveUser } = React.useContext(AuthContext);

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [error, setError] = React.useState(null);

    const changeUsernameHandler = (value) => setUsername(value);
    const changePasswordHandler = (value) => setPassword(value);

    const openHomeHandler = () =>{
        if(ValidateEmpty(username) || ValidateEmpty(password)){
            setError('One or more boxes are empty');
            return;
        }

        setError(null);
        SaveUser(username);
        navigation.push('Tabs');
    }
    const openSignupHandler = () => navigation.push('SignupScreen');
    const openForgotPasswordHandler = () => console.log('ForgotPasswordScreen');

    return(
        <KeyboardAvoidingView style={styles.container}>

            <Image 
                style={styles.image}
                source={require('../assets/logo/xhdpi.png')}/>

            <Text style={styles.title}>Log into the App</Text>

            <TextEntry 
                placeholder='Username'
                width={bigWidth}
                changeHandler={changeUsernameHandler}/>

            <TextEntry 
                placeholder='Password'
                width={bigWidth}
                secureTextEntry={true}
                changeHandler={changePasswordHandler}/>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity 
                style={styles.forgotPass}
                onPress={openForgotPasswordHandler}>
                <Text>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
                <ActionButton 
                    title='Sign up'
                    pressHandler={openSignupHandler}/>

                <ActionButton 
                    title='Log in'
                    pressHandler={openHomeHandler}/>
            </View>
        </KeyboardAvoidingView>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title:{
        fontSize: 20,
        marginBottom: 10
    },

    image:{
        margin: 20,
        marginBottom: 100
    },

    forgotPass:{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-start'
    },

    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    error:{
        marginBottom: 5,
        width: bigWidth,
        color: 'red'
    }
});