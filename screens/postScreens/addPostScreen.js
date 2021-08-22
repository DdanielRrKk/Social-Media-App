import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, KeyboardAvoidingViewBase } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ActionButton from '../../components/misc/actionButton';
import TextEntry from '../../components/misc/textEntry';

import { AntDesign } from '@expo/vector-icons';



export default function AddPostScreen({ navigation, route }){

    const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [tags, setTags] = React.useState(null);

    const backHandler = () => navigation.goBack();
    const openCameraHandler = () => navigation.navigate('CameraScreen', {isProfile: false});
    
    const savePostHandler = () => console.log('savePostHandler');

    const changeDescriptionHandler = (value) => setDescription(value);
    const changeTagsHandler = (value) => setTags(value);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          //allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
        });
    
        if (!result.cancelled) setImage(result.uri);
    };

    React.useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    React.useEffect(() => {
        if (route.params?.image) setImage(route.params.image);
    }, [route.params?.image]);

    if (hasGalleryPermission === null) return <View />;
    if (hasGalleryPermission === false) return <Text>No access to gallery</Text>;

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

                    <View style={styles.postDataContainer}>
                        <ActionButton 
                            title='Take Picture'
                            pressHandler={openCameraHandler}/>

                        <ActionButton 
                            title='Pick Picture'
                            pressHandler={pickImage}/>
                    </View>

                    <TextEntry 
                        placeholder='Description'
                        width={'90%'}
                        changeHandler={changeDescriptionHandler}/>
                        
                    <TextEntry 
                        placeholder='Tags (separate them with empty space)'
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