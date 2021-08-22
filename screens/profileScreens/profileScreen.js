import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal, FlatList } from 'react-native';

import PostItem from '../../components/items/postItem';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

//===================TEST
import { testUser, testFeed } from '../../TESTDATA';
//===================TEST



export default function ProfileScreen({ navigation }){
    const [userData, setUserData] = React.useState(testUser);
    const [userFeedData, setUserFeedData] = React.useState(testFeed);

    const [moreFlag, setMoreFlag] = React.useState(false);
    const [post, setPost] = React.useState(false);

    const openSettingsScreen = () => navigation.navigate('MainSettingsScreen');
    const openEditProfileScreen = () => navigation.navigate('EditProfileScreen', {image: testUser.userPhoto, name: testUser.name, description: testUser.description});

    const openPostCommentsScreen = (postUsername, postDescription) => navigation.navigate('PostCommentsScreen', {username: postUsername, description: postDescription});
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
                    style={styles.settingsButton}
                    onPress={openSettingsScreen}>
                    <Ionicons 
                        name="settings-outline" 
                        size={24} />
                </TouchableOpacity>
            </View>

            <FlatList 
                style={styles.list}
                data={userFeedData}
                renderItem={({item}) => (
                    <PostItem 
                        isMainUser={true}
                        isFeed={false}
                        post={item} 
                        openPostCommentsHandler={openPostCommentsScreen}
                        openMorePopupHandler={openMorePopupHandler}/>
                )}
                ListHeaderComponent={
                    <View style={styles.listContainer}>
                        <View style={styles.profileContainer}>
                            <View style={styles.userDetails}>
                                <Image 
                                    style={styles.userImage}
                                    source={{ uri: userData.userPhoto }}/>

                                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 5 }}>{userData.name}</Text>
                                
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>{userData.username}</Text>
                                
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>{userData.description}</Text>
                            </View>

                            <View style={styles.userInfo}>
                                <View style={styles.info}>
                                    <Text>{userData.postsCount}</Text>
                                    
                                    <Text>Posts</Text>
                                </View>

                                <View style={styles.info}>
                                    <Text>{userData.followersCount}</Text>
                                    
                                    <Text>Followers</Text>
                                </View>

                                <View style={styles.info}>
                                    <Text>{userData.followingCount}</Text>
                                    
                                    <Text>Following</Text>
                                </View>

                                <TouchableOpacity onPress={openEditProfileScreen}>
                                    <Feather 
                                        name="edit-2" 
                                        size={24} />
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                }/>
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    list:{
        flex: 1,
        width: '100%'
    },

    listContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    header:{
        height: 56,
        width: '100%',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    settingsButton:{
        marginRight: 20
    },

    profileContainer:{
        flex: 1,
        width: '100%'
    },

    userImage:{
        height: 120,
        width: 120,
        borderRadius: 60,
        marginBottom: 10
    },

    userDetails:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10
    },

    userInfo:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    info:{
        alignItems: 'center'
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