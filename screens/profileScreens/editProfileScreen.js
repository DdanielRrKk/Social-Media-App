import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ActionButton from '../../components/misc/actionButton';
import TextEntry from '../../components/misc/textEntry';

import { AntDesign } from '@expo/vector-icons';



export default function EditProfileScreen({ navigation, route }){

    const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);    
    const [image, setImage] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    const backHandler = () => navigation.goBack();
    
    const saveProfileHandler = () => console.log('saveProfileHandler');

    const openCameraHandler = () => navigation.navigate('CameraScreen', {isProfile: true});

    const changeNameHandler = (value) => setName(value);
    const changeDescriptionHandler = (value) => setDescription(value);

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
        if (route.params?.name) setName(route.params.name);
        if (route.params?.description) setDescription(route.params.description);
    }, [route.params?.image, route.params?.name, route.params?.description]);

    if (hasGalleryPermission === null) return <View />;
    if (hasGalleryPermission === false) return <Text>No access to gallery</Text>;

    return(
        <View
            style={styles.container}>
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
                    onPress={saveProfileHandler}>
                    <AntDesign 
                        name="check" 
                        size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.profileContainer}>
                <KeyboardAvoidingView>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.userImage}
                            source={{ uri: image }}/>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <ActionButton 
                            title='Take Picture'
                            pressHandler={openCameraHandler}/>

                        <ActionButton 
                            title='Pick Picture'
                            pressHandler={pickImage}/>
                    </View>

                    <TextEntry 
                        placeholder='Name'
                        value={name}
                        width={'90%'}
                        changeHandler={changeNameHandler}/>

                    <TextEntry 
                        placeholder='Description'
                        value={description}
                        width={'90%'}
                        changeHandler={changeDescriptionHandler}/>
                </KeyboardAvoidingView>
            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    backButton:{
        marginLeft: 20
    },

    saveButton:{
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

    imageContainer:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10
    },

    buttonsContainer:{
        flexDirection: 'row',
    },
});