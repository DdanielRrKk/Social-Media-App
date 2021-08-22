import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

import ActionButton from '../components/misc/actionButton';
import TextEntry from '../components/misc/textEntry';

import {
    ValidateEmpty, 
    ValidateMaxLength,
    ValidateMinLength, 
    ValidateSpecialChars, 
    ValidateEmail, 
    ValidatePasswords} from '../helpers/validators';



const bigWidth = '90%';
const smallWidth = '40%';

export default function SignupScreen({ navigation }){

    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confirmPassword, setConfirmPassword] = React.useState(null);

    const [firstNameError, setFirstNameError] = React.useState(null);
    const [lastNameError, setLastNameError] = React.useState(null);
    const [usernameError, setUsernameError] = React.useState(null);
    const [emailError, setEmailError] = React.useState(null);
    const [passwordError, setPasswordError] = React.useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(null);

    const changeFirstNameHandler = (value) => setFirstName(value);
    const changeLastNameHandler = (value) => setLastName(value);
    const changeUsernameHandler = (value) => setUsername(value);
    const changeEmailHandler = (value) => setEmail(value);
    const changePasswordHandler = (value) => setPassword(value);
    const changeConfirmPasswordHandler = (value) => setConfirmPassword(value);

    const ValidateFirstNameField = (value) => {
        if(ValidateEmpty(value)){setFirstNameError('First name is required'); return true;}
        if(ValidateMinLength(value, 1)){ setFirstNameError('First name should contain more than 1 letter'); return true; }
        if(ValidateMaxLength(value, 31)){ setFirstNameError('First name should contain less than 31 letters'); return true; }
        if(ValidateSpecialChars(value)){ setFirstNameError('First name shouldnt contain special characters'); return true; }
        setFirstNameError(null);
        return false;
    }
    
    const ValidateLastNameField = (value) => {
        if(ValidateEmpty(value)){setLastNameError('Last name is required'); return true;}
        if(ValidateMinLength(value, 2)){ setLastNameError('Last name should contain more than 2 letter'); return true; }
        if(ValidateMaxLength(value, 31)){ setLastNameError('Last name should contain less than 31 letters'); return true; }
        if(ValidateSpecialChars(value)){ setLastNameError('Last name shouldnt contain special characters'); return true; }
        setLastNameError(null);
        return false;
    }
    
    const ValidateUsernameField = (value) => {
        if(ValidateEmpty(value)){setUsernameError('Username is required'); return true;}
        if(ValidateMinLength(value, 3)){ setUsernameError('Username should contain more than 3 letters'); return true; }
        if(ValidateMaxLength(value, 35)){ setUsernameError('Username should contain less than 35 letters'); return true; }
        setUsernameError(null);
        return false;
    }
    
    const ValidateEmailField = (value) => {
        if(ValidateEmpty(value)){setEmailError('Email is required'); return true;}
        if(ValidateEmail(value)){ setEmailError('Invalid Email'); return true; }
        setEmailError(null);
        return false;
    }
    
    const ValidatePasswordField = (value) => {
        if(ValidateEmpty(value)){setPasswordError('Password is required'); return true;}
        if(ValidateMinLength(value, 4)){ setPasswordError('Password should contain more than 4 letters'); return true; }
        if(ValidateMaxLength(value, 133)){ setPasswordError('Password should contain less than 133 letters'); return true; }
        setPasswordError(null);
        return false;
    }
    
    const ValidateConfirmPasswordField = (value1, value2) => {
        if(ValidateEmpty(value2)){setConfirmPasswordError('Password is required'); return true;}
        if(ValidatePasswords(value1, value2)){ setConfirmPasswordError('Password confirmation was unsuccessful'); return true; }
        setConfirmPasswordError(null);
        return false;
    }

    const signUpHandler = () =>{
        let errorCount = 0;
        if(ValidateFirstNameField(firstName)) errorCount++;
        if(ValidateLastNameField(lastName)) errorCount++;
        if(ValidateUsernameField(username)) errorCount++;
        if(ValidateEmailField(email)) errorCount++;
        if(ValidatePasswordField(password)) errorCount++;
        if(ValidateConfirmPasswordField(password, confirmPassword)) errorCount++;
        if(errorCount != 0) return;

        navigation.navigate('Tabs');
    }
    const backHandler = () => navigation.goBack();

    return(
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Sign Up your Account</Text>

            <View style={styles.buttonsContainer}>
                <TextEntry 
                    placeholder='First name'
                    width={smallWidth}
                    changeHandler={changeFirstNameHandler}/>

                <TextEntry 
                    placeholder='Last name'
                    width={smallWidth}
                    changeHandler={changeLastNameHandler}/>
            </View>

            {(firstNameError || lastNameError) && 
            <View style={styles.errorsContainer}>
                <Text style={styles.errorSmallLeft}>{firstNameError}</Text>

                <Text style={styles.errorSmallRight}>{lastNameError}</Text>
            </View>}

            <TextEntry 
                placeholder='Username'
                width={bigWidth}
                changeHandler={changeUsernameHandler}/>

            {usernameError && <Text style={styles.errorBig}>{usernameError}</Text>}

            <TextEntry 
                placeholder='Email'
                width={bigWidth}
                changeHandler={changeEmailHandler}/>

            {emailError && <Text style={styles.errorBig}>{emailError}</Text>}

            <TextEntry 
                placeholder='Password'
                width={bigWidth}
                secureTextEntry={true}
                changeHandler={changePasswordHandler}/>

            {passwordError && <Text style={styles.errorBig}>{passwordError}</Text>}

            <TextEntry 
                placeholder='Confirm Password'
                width={bigWidth}
                secureTextEntry={true}
                changeHandler={changeConfirmPasswordHandler}/>

            {confirmPasswordError && <Text style={styles.errorBig}>{confirmPasswordError}</Text>}

            <View style={styles.buttonsContainer}>
                <ActionButton 
                    title='Cancel'
                    pressHandler={backHandler}/>

                <ActionButton 
                    title='Sign up'
                    pressHandler={signUpHandler}/>
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
    },

    entryContainer:{
        flexDirection: 'row',
    },

    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    errorBig:{
        width: bigWidth,
        color: 'red'
    },

    errorsContainer:{
        flexDirection: 'row',
        width: bigWidth,
        justifyContent: 'space-between'
    },

    errorSmallLeft:{
        width: '45%',
        color: 'red'
    },

    errorSmallRight:{
        width: '45%',
        color: 'red'
    }
});