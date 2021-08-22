import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';



export default function CommentItem({ 
                                isMainUser,
                                bubble,
                                //openTagHandler, 
                                openPersonsProfileHandler,
                                openProfileHandler }){

    if(bubble.isTag){
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.card}
                    //onPress={() => openTagHandler(bubble.name)}
                    >
                    <View style={styles.tagImage}>
                        <Text style={{fontSize: 24, color: 'white'}}>#</Text>
                    </View>
    
                    <View style={styles.infoContainer}>
                        <Text style={styles.userName}>{bubble.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    if(isMainUser){
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => openProfileHandler()}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.userImage}
                            source={{uri: bubble.userPhoto}}/>
                    </View>
    
                    <View style={styles.infoContainer}>
                        <Text style={styles.userName}>{bubble.username}</Text>
    
                        <Text>{bubble.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.card}
                onPress={() => openPersonsProfileHandler(bubble.userName)}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.userImage}
                        source={{uri: bubble.userPhoto}}/>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.userName}>{bubble.username}</Text>

                    <Text>{bubble.name}</Text>
                </View>
            </TouchableOpacity>
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

    tagImage:{
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})