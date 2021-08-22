import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, FlatList, Modal } from 'react-native';
import PostItem from '../../components/items/postItem';

//===================TEST
import { testUser, testFeed } from '../../TESTDATA';
//===================TEST



export default function PersonsProfileScreen({ navigation }){
    const [userData, setUserData] = React.useState(testUser);
    const [userFeedData, setUserFeedData] = React.useState(testFeed);
    const [isFollow, setIsFollow] = React.useState(testUser.isFollow);

    const openPostCommentsScreen = (postUsername, postDescription) => navigation.navigate('PostCommentsScreen', {username: postUsername, description: postDescription});

    const followUnfollow = () =>{
        if(isFollow) {
            setIsFollow(false);
            return;
        }
        setIsFollow(true);
        console.log('followUnfollow');
    }

    return(
        <FlatList 
            style={styles.list}
            data={userFeedData}
            renderItem={({item}) => (
                <PostItem 
                    isMainUser={false}
                    isFeed={false}
                    post={item} 
                    openPostCommentsHandler={openPostCommentsScreen}/>
            )}
            ListHeaderComponent={
                <View style={styles.listContainer}>
                    <View style={styles.header}></View>

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

                            <TouchableOpacity onPress={followUnfollow}>
                                <Text>{(isFollow) ? 'Following' : 'Follow'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }/>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1,
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