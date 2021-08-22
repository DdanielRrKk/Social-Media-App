import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './helpers/tabNavigation';

import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';
import AddPostScreen from './screens/postScreens/addPostScreen';
import CameraScreen from './screens/postScreens/addPostScreens/cameraScreen';
import EditPostScreen from './screens/postScreens/editPostScreen';
import PersonsProfileScreen from './screens/profileScreens/personsProfileScreen';
import EditProfileScreen from './screens/profileScreens/editProfileScreen';
import PostCommentsScreen from './screens/postScreens/postCommentsScreen';
import SearchScreen from './screens/homeScreens/searchScreen';
import MainSettingsScreen from './screens/settingsScreens/mainSettingsScreen';

import {AuthContext} from './helpers/globals';



const NavStack = createStackNavigator();



export default function App() {
  
  const [mainUser, setMainUser] = React.useState({});

  const authContext = React.useMemo(() => ({
    SaveUser: (value) => { setMainUser(value); },
    GetUser: () => { return mainUser; }
  }));

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <NavStack.Navigator initialRouteName='LoginScreen'>
          <NavStack.Screen name='LoginScreen' component={LoginScreen} options={{ headerMode: 'none' }}/>
          <NavStack.Screen name='SignupScreen' component={SignupScreen} options={{ headerMode: 'none' }}/>
          
          <NavStack.Screen name='Tabs' component={Tabs} options={{ headerMode: 'none' }}/>
          
          <NavStack.Screen name='AddPostScreen' component={AddPostScreen} options={{ headerMode: 'none' }}/>
          <NavStack.Screen name='CameraScreen' component={CameraScreen} options={{ headerMode: 'none' }}/>
          <NavStack.Screen name='EditPostScreen' component={EditPostScreen} options={{ headerMode: 'none' }}/>
          <NavStack.Screen name='PostCommentsScreen' component={PostCommentsScreen} options={{ headerMode: 'none' }}/>

          <NavStack.Screen name='SearchScreen' component={SearchScreen} options={{ headerMode: 'none' }}/>

          <NavStack.Screen name='PersonsProfileScreen' component={PersonsProfileScreen} options={{ headerMode: 'none' }}/>
          <NavStack.Screen name='EditProfileScreen' component={EditProfileScreen} options={{ headerMode: 'none' }}/>
          
          <NavStack.Screen name='MainSettingsScreen' component={MainSettingsScreen} options={{ headerMode: 'none' }}/>
        </NavStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
