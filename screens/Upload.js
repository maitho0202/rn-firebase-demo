import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { storage } from '../firebase';

const Upload = () => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickerImage = () => {
        // No permissions request is neccessary for launching the image library

        const options = {
			title: "Select Avatar",
			customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
			storageOptions: {
				skipBackup: true,
				path: "images"
			}
		};

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                let source = { uri: response.uri };
                console.log(source);
                setImage(source);
            }
            
            
        });
    }

    const uploadImage = async () => {
        setUploading(true);
        const reponse = await fetch(image.uri);
        const blob = await reponse.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/' + 1));
        const ref = storage.ref().child(filename).put(blob);

        try {
            await ref;
        } catch (e) {
            console.log(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploaded... !!!'
        );
        setImage(null);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.selectBtn} onPress={pickerImage}>
                <Text style={styles.btnText}>Pick an Image</Text>
            </TouchableOpacity>
            <View style={styles.imgContainer}>
                {image && <Image source={{uri: image.uri}} style={{width: 300, height: 300}} />}
                <TouchableOpacity style={styles.uploadBtn} onPress={uploadImage}>
                    <Text style={styles.btnText}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Upload

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectBtn: {
        width: 150,
        height: 50,
        backgroundColor: '#0782F9',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBtn: {
        width: 150,
        height: 50,
        backgroundColor: '#FF3D71',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    imgContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },

})