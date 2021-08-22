import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';



export default function CommentItem({ 
                                isMainUser, 
                                comment, 
                                openPersonsProfileHandler,
                                openProfileHandler }){

    //const deleteCommentHandler = () => console.log('deleteCommentHandler');

    if(isMainUser){
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <TouchableOpacity
                        style={styles.imageContainer}
                        onPress={() => openProfileHandler()}>
                        <Image
                            style={styles.userImage}
                            source={{uri: comment.userPhoto}}/>
                    </TouchableOpacity>
    
                    <View style={styles.commentContainer}>
                        <Text 
                            style={styles.userName}
                            onPress={() => openProfileHandler()}>{comment.username}</Text>
    
                        <Text>{comment.comment}</Text>
                    </View>
                </View>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => openPersonsProfileHandler(comment.userName)}>
                    <Image
                        style={styles.userImage}
                        source={{uri: comment.userPhoto}}/>
                </TouchableOpacity>

                <View style={styles.commentContainer}>
                    <Text 
                        style={styles.userName}
                        onPress={() => openPersonsProfileHandler(comment.userName)}>{comment.username}</Text>

                    <Text>{comment.comment}</Text>
                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
    },

    card:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },

    imageContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },

    commentContainer:{
        flex: 1
    },

    userImage:{
        width: 40,
        height: 40,
        borderRadius: 20
    },

    userName:{
        fontSize: 16,
        fontWeight: 'bold'
    },
})