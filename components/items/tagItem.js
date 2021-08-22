import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';



export default function TagItem({ name }){

    const openTagHandler = () => console.log('open ' + name);

    return(
        <TouchableOpacity 
            style={styles.tagContainer}
            onPress={() => openTagHandler()}>
            <Text style={styles.tag}>#{name}</Text>
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    tagContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2
    },

    tag:{
        fontWeight: 'bold',
        fontSize: 14,
        color: 'blue',
    },
})