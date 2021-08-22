import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function TextEntry({ placeholder, value, width, secureTextEntry, changeHandler }){
    return(
        <View 
            style={styles.entry}
            width={width}>
            <TextInput
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={changeHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    entry:{
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
    }
});