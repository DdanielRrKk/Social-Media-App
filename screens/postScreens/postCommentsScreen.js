import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, KeyboardAvoidingView } from 'react-native';

import CommentItem from '../../components/items/commentItem';

import { AntDesign } from '@expo/vector-icons';

import { AuthContext } from '../../helpers/globals';
import { TextInput } from 'react-native-gesture-handler';

//===================TEST
import { testComments } from '../../TESTDATA';
//===================TEST



export default function PostCommentsScreen({ navigation, route }){
    const { GetUser } = React.useContext(AuthContext);
    const mainUsername = GetUser();

    const [commentsData, setCommentsData] = React.useState(testComments);

    const { username, description } = route.params;

    const backHandler = () => navigation.goBack();
    const openPersonsProfileScreen = (postUsername) => navigation.navigate('PersonsProfileScreen', {username: postUsername});
    const openProfileScreen = () =>{
        navigation.goBack();
        navigation.navigate('Tabs', {screen: 'ProfileScreen'});
    }

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

                <Text style={styles.headerTitle}>Comments</Text>
            </View>

            <View style={styles.postDescription}>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>{username}</Text>
                {description ? <Text>{description}</Text> : null}
            </View>

            <FlatList 
                style={styles.list}
                data={commentsData}
                renderItem={({item}) => (
                    <CommentItem 
                        isMainUser={(item.username == mainUsername)? true : false}
                        comment={item}
                        openPersonsProfileHandler={openPersonsProfileScreen}
                        openProfileHandler={openProfileScreen}/>
                )}/>

            <View style={styles.footer}>
                <TextInput 
                    style={styles.commentBar}
                    placeholder='Comment'/>

                <TouchableOpacity>
                    <Text style={styles.sendButton}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },

    postDescription:{
        width: '100%',
        padding: 10,
        paddingHorizontal: 16,
        justifyContent: 'space-evenly',
        marginBottom: 10
    },

    list:{
        width: '100%'
    },

    footer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'black'
    },

    commentBar:{
        height: 50,
        width: '80%',
        marginRight: 10
    },

    sendButton:{
        fontSize: 16,
        fontWeight: 'bold'
    }
});