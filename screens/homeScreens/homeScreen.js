import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

import PostItem from '../../components/items/postItem';

import { AntDesign } from '@expo/vector-icons';

import { AuthContext } from '../../helpers/globals';

//===================TEST
import { testFeed } from '../../TESTDATA';
//===================TEST



export default function HomeScreen({ navigation }){    
    const { GetUser } = React.useContext(AuthContext);
    const username = GetUser();

    const [feedData, setFeedData] = React.useState(testFeed);

    const [moreFlag, setMoreFlag] = React.useState(false);
    const [post, setPost] = React.useState(false);

    const openSearchScreen = () => navigation.navigate('SearchScreen');
    const openPostCommentsScreen = (postUsername, postDescription) => navigation.navigate('PostCommentsScreen', {username: postUsername, description: postDescription});
    const openPersonsProfileScreen = (postUsername) => navigation.navigate('PersonsProfileScreen', {username: postUsername});
    const openProfileScreen = () => navigation.navigate('Tabs', {screen: 'ProfileScreen'});
    const openMorePopupHandler = (item) => {
        setPost(item);
        setMoreFlag(true);
    }

    const openEditPostScreen = () =>{
        closePopup();
        navigation.navigate('EditPostScreen', {image: post.photo, description: post.description, tags: post.tags});
    }
    const deletePostHandler = () =>{
        closePopup();
        console.log('deletePostHandler');
    }

    const closePopup = () => {
        setMoreFlag(false);
    }

    return(
        <View style={styles.container}>

            <Modal 
                transparent={true}
                visible={moreFlag}
                animationType='fade'
                onRequestClose={closePopup}>
                <TouchableOpacity 
                    style={styles.popupContainer}
                    onPress={closePopup}>
                    <View style={styles.popup}>
                        <TouchableOpacity 
                            style={styles.popupButton}
                            onPress={openEditPostScreen}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.popupButton}
                            onPress={deletePostHandler}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={openSearchScreen}>
                    <AntDesign 
                        name="search1" 
                        size={24} />
                </TouchableOpacity>
            </View>

            <FlatList 
                style={styles.list}
                data={feedData}
                renderItem={({item}) => (
                    <PostItem 
                        isMainUser={(item.username == username)? true : false}
                        isFeed={true}
                        post={item} 
                        openPostCommentsHandler={openPostCommentsScreen}
                        openPersonsProfileHandler={openPersonsProfileScreen}
                        openProfileHandler={openProfileScreen}
                        openMorePopupHandler={openMorePopupHandler}/>
                )}/>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    searchButton:{
        marginRight: 20
    },

    list:{
        width: '100%'
    },

    popupContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    popup:{
        height: '25%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    popupButton:{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 10,
        margin: 10,
    }
});