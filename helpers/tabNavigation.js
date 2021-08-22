import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from '@expo/vector-icons';

import HomeScreen from '../screens/homeScreens/homeScreen';
import ProfileScreen from '../screens/profileScreens/profileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () =>{

    const EmptyScreen = () =>{
        return (null);
    }

    return(
        <Tab.Navigator initialRouteName='HomeScreen'>
            <Tab.Screen 
                name='HomeScreen' 
                component={HomeScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => (
                        <AntDesign 
                            name="home" 
                            size={24} 
                            color={color} />
                    ),
                    }}/>
            <Tab.Screen 
                name='AddContainer' 
                component={EmptyScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => (
                        <AntDesign 
                            name="pluscircleo" 
                            size={24} 
                            color={color} />
                    ),
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate('AddPostScreen');
                        }
                    })}/>
            <Tab.Screen 
                name='ProfileScreen' 
                component={ProfileScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => (
                        <AntDesign 
                            name="user" 
                            size={24} 
                            color={color} />
                    ),
                    }}/>
        </Tab.Navigator>
    );
}

export default Tabs;