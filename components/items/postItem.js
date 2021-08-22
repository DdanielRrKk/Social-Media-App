import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';

import TagItem from './tagItem';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



export default function PostItem({ 
                                isMainUser, 
                                isFeed,
                                post, 
                                openPostCommentsHandler,
                                openPersonsProfileHandler,
                                openProfileHandler,
                                openMorePopupHandler }){

    const [isFollow, setIsFollow] = React.useState(post.isFollow);
    const [isLiked, setIsLiked] = React.useState(post.isLiked);

    const followUnfollow = () =>{
        if(isFollow) {
            setIsFollow(false);
            return;
        }
        setIsFollow(true);
    }

    const likeUnlike = () =>{
        if(isLiked) {
            setIsLiked(false);
            return;
        }
        setIsLiked(true);

    }

    if(!isFeed){
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Image
                                style={styles.userImage}
                                source={{uri: post.userPhoto}}/>

                            <Text style={styles.userName}>{post.username}</Text>
                        </View>

                        {isMainUser 
                            ?
                            <View style={styles.headerRight}>
                                <TouchableOpacity onPress={() => openMorePopupHandler(post)}>
                                    <Entypo 
                                        style={styles.moreButton}
                                        name="dots-three-horizontal" />
                                </TouchableOpacity>
                            </View>
                            : null}
                    </View>

                    <Image 
                        style={styles.feedImage}
                        source={{uri: post.photo}}/>

                    {post.description 
                        ? <Text style={styles.feedDescription}>{post.description}</Text>
                        : null
                    }

                    <View style={styles.footer}>
                        <View style={styles.footerLeft}>
                            <TouchableOpacity onPress={likeUnlike}>
                                <FontAwesome 
                                    name={(isLiked ? "heart" : "heart-o")}
                                    size={24} />
                            </TouchableOpacity>

                            <Text style={styles.counters}>{post.likesCount}</Text>

                            <TouchableOpacity onPress={() => openPostCommentsHandler(post.username, post.description)}>
                                <FontAwesome 
                                    name="comment-o"
                                    size={24} />
                            </TouchableOpacity>
                                
                            <Text style={styles.counters}>{post.commentsCount}</Text>
                        </View>

                        <Text>{post.deleteDate}</Text>
                    </View>

                </View>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                {isMainUser
                    ?
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.headerLeft}
                            onPress={() => openProfileHandler()}>
                            <Image
                                style={styles.userImage}
                                source={{uri: post.userPhoto}}/>

                            <Text style={styles.userName}>{post.username}</Text>
                        </TouchableOpacity>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => openMorePopupHandler(post)}>
                                <Entypo 
                                    style={styles.moreButton}
                                    name="dots-three-horizontal" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.headerLeft}
                            onPress={() => openPersonsProfileHandler(post.userName)}>
                            <Image
                                style={styles.userImage}
                                source={{uri: post.userPhoto}}/>

                            <Text style={styles.userName}>{post.username}</Text>
                        </TouchableOpacity>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={followUnfollow}>
                                <Text>{(isFollow) ? 'Following' : 'Follow'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }

                <Image 
                    style={styles.feedImage}
                    source={{uri: post.photo}}/>

                <FlatList 
                    horizontal={true}
                    data={post.tags}
                    renderItem={({item}) => ( <TagItem name={item}/> )}/>

                {post.description 
                    ? <Text style={styles.feedDescription}>{post.description}</Text>
                    : null
                }

                <View style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <TouchableOpacity onPress={likeUnlike}>
                            <FontAwesome 
                                name={(isLiked ? "heart" : "heart-o")}
                                size={24} />
                        </TouchableOpacity>

                        <Text style={styles.counters}>{post.likesCount}</Text>

                        <TouchableOpacity onPress={() => openPostCommentsHandler(post.username, post.description)}>
                            <FontAwesome 
                                name="comment-o"
                                size={24} />
                        </TouchableOpacity>
                            
                        <Text style={styles.counters}>{post.commentsCount}</Text>
                    </View>

                    <Text>{post.deleteDate}</Text>
                </View>

            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    card:{
        marginVertical: 16
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerLeft:{
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },

    headerRight:{
        marginRight: 16
    },

    userImage:{
        width: 40,
        height: 40,
        borderRadius: 20
    },

    userName:{
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    
    moreButton:{
        fontSize: 20
    },

    feedImage:{
        width: '100%',
        height: 300,
        marginVertical: 10,
    },

    feedDescription:{
        fontSize: 14,
        marginBottom: 10,
        marginHorizontal: 16
    },

    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16
    },

    footerLeft:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    counters:{
        marginHorizontal: 10
    },
})