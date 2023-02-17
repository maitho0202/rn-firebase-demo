/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as firebase from 'firebase';
import Login from './screens/Login';
import Home from './screens/Home';
import Upload from './screens/Upload';

const WIDTH = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();

export default App = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyD25ESalWlwuCk-creZeopzVePEEVpJreE',
      authDomain: 'fir-rn-16ca9.firebaseapp.com',
      databaseURL: 'https://fir-rn-16ca9-default-rtdb.firebaseio.com',
      projectId: 'fir-rn-16ca9',
      storageBucket: 'fir-rn-16ca9.appspot.com',
      messagingSenderId: '877016773233',
      appId: '1:877016773233:web:71010515f63e856dc7a1d0',
    };

    if (!firebase.apps.length) {
      // Initialize Firebase
      const firebaseApp = firebase.initializeApp(firebaseConfig);
      console.log('Kết nối thành công');
    }

    get_Data();
  }, []);

  addDataBase = (id, name, address) => {
    firebase
      .database()
      .ref('user/' + id)
      .set(
        {
          Name: name,
          Address: address,
        },
        (error) => {
          if (error) {
            alert('Lỗi cmrn !!!');
          } else {
            alert('Thành công !!!');
            setId('');
            setName('');
            setAddress('');
          }
        },
      );
  };

  updateDataBase = (id, name, address) => {
    firebase
      .database()
      .ref('user/' + id)
      .set(
        {
          Name: name,
          Address: address,
        },
        (error) => {
          if (error) {
            alert('Lỗi cmrn !!!');
          } else {
            alert('Thành công !!!');
          }
        },
      );
  };

  deleteDataBase = (id) => {
    firebase
      .database()
      .ref('user/' + id)
      .remove();
    alert('Xóa thành công !!!');
  };

  get_Data = () => {
    firebase
      .database()
      .ref('user/')
      .on('value', (snapshot) => {
        let array = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          array.push({
            id: childSnapshot.key,
            name: childData.Name,
            address: childData.Address,
          });
        });
        // console.log(array);
        setData(array);
      });
  };

  createThreeButtonAlert = (item) => {
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Xóa',
        onPress: () => {
          console.log('Ask me later pressed');
          deleteDataBase(item.id);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Sửa',
        onPress: () => {
          console.log('OK Pressed');
          updateDataBase(item.id, item.name, item.address);
        },
      },
    ]);
  }
  
  return (
    <>
      {/* <View style={styles.container}>
        <ScrollView>
          <TextInput
            style={styles.nhap}
            placeholder={'Id'}
            value={id}
            onChangeText={(text) => {
              setId(text);
            }}
          />
          <TextInput
            style={styles.nhap}
            placeholder={'Name'}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            style={styles.nhap}
            placeholder={'Address'}
            value={address}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              addDataBase(id, name, address);
            }}>
            <Text style={styles.btn}>Thêm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateDataBase(id, name, address);
            }}>
            <Text style={styles.btn}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteDataBase(id);
            }}>
            <Text style={styles.btn}>Xóa</Text>
          </TouchableOpacity>
        </ScrollView>

        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    createThreeButtonAlert(item);
                  }}>
                  <Text style={{borderBottomWidth: 3, width: WIDTH, padding: 10}}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <StatusBar style="auto" />
      </View> */}

      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <Upload />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nhap: {
    width: 350,
    padding: 15,
    marginBottom: 20,
    borderWidth: 3,
  },
  btn: {
    backgroundColor: 'aqua',
    padding: 15,
    marginBottom: 10,
  },
});
