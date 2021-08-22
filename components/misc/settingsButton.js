import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SettingsButton({ iconName, title, pressHandler }){
    return(
        <TouchableOpacity 
            style={styles.button}
            onPress={pressHandler}>
                <Ionicons 
                    name={iconName} 
                    size={24} />

                <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    text:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    }
});