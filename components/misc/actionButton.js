import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ActionButton({ title, pressHandler }){
    return(
        <TouchableOpacity 
            style={styles.button}
            onPress={pressHandler}>
                <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        width: '40%',
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});