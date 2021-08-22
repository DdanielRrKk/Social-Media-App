import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



export default function CameraScreen({ navigation, route }){

    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [camera, setCamera] = React.useState(null);
    const [isProfile, setIsProfile] = React.useState(null);

    const backHandler = () => navigation.goBack();

    React.useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () =>{
        if(camera){
            const data = await camera.takePictureAsync(null);

            if(isProfile) {
                navigation.navigate('EditProfileScreen', {image: data.uri});
                return;
            }

            navigation.navigate('AddPostScreen', {image: data.uri});
        }
    }

    React.useEffect(() => {
        if (route.params?.isProfile) setIsProfile(route.params.isProfile);
    }, [route.params?.isProfile]);

    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text>No access to camera</Text>;

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
            </View>

            <View style={styles.cameraContainer}>
                <Camera 
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio} 
                    type={type}
                    ratio={'4:3'}>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                        }}>
                        <Entypo name="cycle" size={24} />
                    </TouchableOpacity>
                </Camera>
            </View>

            <TouchableOpacity
                style={styles.takeButton}
                onPress={takePicture}>
                <Entypo name="circle" size={26} />
            </TouchableOpacity>
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

    cameraContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    fixedRatio:{
        flex: 1,
        aspectRatio: 3/4,
        flexDirection: 'row'
    },

    flipButton:{
        height: 40,
        width: 40,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#333',
        opacity: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },

    takeButton:{
        height: 50,
        width: 50,
        margin: 10,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
});