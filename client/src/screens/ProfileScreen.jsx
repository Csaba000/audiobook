import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Touchable } from 'react-native';
import { AuthContext } from '../components/AuthProvider';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { LoginContext } from '../components/IsLoggedIn';
import ModifiedButton from '../components/ModifiedButton';
import { headers } from '../utils/constants';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const ProfilScreen = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [isLoading, setLoading] = useState(true);
  const [isChanging, setChanging] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [changedEmail, setChangedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = React.useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  useEffect(() => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;

      axios
        .post(`${BACKEND_URL}/users/currentUser`, { email }, headers)
        .then((resp) => {
          setEmail(resp.data);
          //console.log(resp);
          // setChangedEmail(email);
          //console.log(email);
        })
        .catch(function (error) {
          console.log('Server error: ', error);
        })
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      alert('Login token is not good');
    }
  }, []);

  const checkIfValid = (text) => {
    let reg = /\S+@\S+\.\S+/;
    let isValid = true;
    if (reg.test(text) === false) {
      isValid = false;
      // setChangedEmail(text);
      handleError('Enter valid email', 'email');
      setIsWrong(true);
    } else {
      setIsWrong(false);
      isValid = true;
    }

    if (isValid && !isWrong) {
      sendData(text);
    } else {
      alert('Incorrect email.');
    }
  };

  const handleError = (error, input) => {
    setError(error);
  };

  const sendData = (text) => {
    //console.log(text);
    // if (isChanging === false) {
    //   axios
    //     .post(`${BACKEND_URL}/users/emailChange`, { email, password, newEmail: text }, headers)
    //     .then((response) => console.log(response))
    //     .catch(function (error) {
    //       alert('Server error: ', error);
    //     });
    // } else {
    //   alert('Finish editing!');
    // }
  };

  const changeSettings = (text) => {
    setChanging(!isChanging);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.pfp} />
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          backgroundColor: '#62466D',
          borderRadius: 30,
          height: 250,
        }}
      >
        <Ionicons
          name="settings"
          style={{ fontSize: 30, margin: 10, marginRight: 20 }}
          //onPress={changeSettings} //necessary if you want to change textinput data
          color={isChanging ? 'firebrick' : COLORS.box}
        />
        <View
          style={[
            styles.inputContainer,
            {
              alignItems: 'center',
              //borderColor: isChanging ? (isWrong ? COLORS.red : COLORS.box) : COLORS.box,
            },
          ]}
        >
          <Text
            style={{ marginVertical: 5, fontSize: 14, color: COLORS.white, marginHorizontal: 10 }}
          >
            Email:
          </Text>
          <TextInput
            defaultValue={email}
            onChangeText={(text) => changeSettings(text)}
            onEndEditing={(text) => changeSettings(text)}
            onFocus={() => handleError(null, 'email')}
            editable={isChanging}
            style={{ color: '#c2b8cc', width: 220, textAlign: 'justify' }}
            autoComplete="email"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {isWrong ? <Text style={{ color: 'red', left: -270, top: 40 }}>{error}</Text> : null}
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              alignItems: 'center',
            },
          ]}
        >
          <Text style={{ margin: 10, color:'white' }}>Password:</Text>
          <Text style={{ margin: 10, color: '#c2b8cc' }}>******</Text>
        </View>
      </View>
      <View style={{ width: 300, marginTop: -20 }}>
        <ModifiedButton
          title="LogOut"
          style={styles.logout}
          onPress={async () => {
            let s = await AsyncStorage.getItem('token');
            await AsyncStorage.clear();
            let x = await AsyncStorage.getItem('token');
            console.log(s);
            console.log(x);
            setIsLoggedIn(false);
          }}
        ></ModifiedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#391B45',
  },
  text: {
    color: '#fff',
    fontSize: 44,
  },
  pfp: { width: 150, height: 150, borderRadius: 100 },
  inputContainer: {
    color: COLORS.white,
    height: 55,
    width: 350,
    backgroundColor: COLORS.inputBackground,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 25,
    elevation: 10,
    margin: 10,
  },
});

export default ProfilScreen;
