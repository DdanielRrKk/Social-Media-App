import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import SettingsButton from '../../components/misc/settingsButton';

import { AntDesign } from '@expo/vector-icons';



export default function MainSettingsScreen({ navigation }){

    const backHandler = () => navigation.goBack();

    const openManageAccountScreen = () => console.log('openManageAccountScreen');
    const openColorScreen = () => console.log('openColorScreen');

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={backHandler}>
                    <AntDesign 
                        name="left" 
                        size={24} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView>
                <SettingsButton 
                    iconName='person-circle-outline'
                    title='Manage Account'
                    pressHandler={openManageAccountScreen}/>
                    
                <SettingsButton 
                    iconName='color-palette-outline'
                    title='Colors'
                    pressHandler={openColorScreen}/>
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    header:{
        height: 56,
        width: '100%',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    backButton:{
        marginLeft: 20
    },
    
    headerTitle:{
        marginLeft: 20,
        fontSize: 22,
        fontWeight: 'bold'
    }
});