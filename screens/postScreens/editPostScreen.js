import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, KeyboardAvoidingViewBase } from 'react-native';

import TextEntry from '../../components/misc/textEntry';

import { AntDesign } from '@expo/vector-icons';



export default function EditPostScreen({ navigation, route }){

    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [tags, setTags] = useState(null);

    const backHandler = () => navigation.goBack();
    
    const savePostHandler = () => console.log('savePostHandler');

    const changeDescriptionHandler = (value) => setDescription(value);
    const changeTagsHandler = (value) => setTags(value);

    useEffect(() => {
        if (route.params?.image) setImage(route.params.image);
        if (route.params?.description) setDescription(route.params.description);
        if (route.params?.tags) setTags(route.params.tags);
    }, [route.params?.image, route.params?.description, route.params?.tags]);

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

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={savePostHandler}>
                    <AntDesign 
                        name="check" 
                        size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={styles.imageContainer}>
                        {image 
                        ? <Image source={{uri: image}} style={styles.image}/>
                        : <Text style={styles.image, {justifyContent: 'center'}}>No image found</Text>}
                    </View>

                    <TextEntry 
                        placeholder='Description'
                        value={description}
                        width={'90%'}
                        changeHandler={changeDescriptionHandler}/>
                        
                    <TextEntry 
                        placeholder='Tags (separate them with empty space)'
                        value={tags}
                        width={'90%'}
                        changeHandler={changeTagsHandler}/>
                </KeyboardAvoidingView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    backButton:{
        marginLeft: 20
    },

    saveButton:{
        marginRight: 20
    },

    imageContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 3/4,
    },

    image:{ 
        flex: 1,
        width:'100%',
    },

    postDataContainer:{
        flexDirection: 'row',
    }
});