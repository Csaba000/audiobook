import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  Keyboard,
  Alert,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import COLORS from '../constants/colors';
import Loader from '../components/Loader';
import ModifiedButton from '../components/ModifiedButton';

const SignUpScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    cpassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.username) {
      handleError('Please input username', 'username');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }
    if (!inputs.cpassword) {
      handleError('Please input password', 'cpassword');
      isValid = false;
    } else if (inputs.password !== inputs.cpassword) {
      handleError('Passwoad and confirm password should be same.', 'cpassword');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('SignInScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.darkGray, flex: 1 }}>
      <Loader visible={loading} />
      <View style={styles.container}>
        <Image source={require('../assets/logo1.png')} resizeMode="contain" style={styles.image} />

        <View style={styles.rect}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.rectInside}>
              <Input
                overflow="hidden"
                onChangeText={(text) => handleOnchange(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                iconName="email-outline"
                label="Email"
                placeholder="Enter your email address"
                error={errors.email}
              />
              <Input
                onChangeText={(text) => handleOnchange(text, 'username')}
                onFocus={() => handleError(null, 'username')}
                iconName="account-outline"
                label="Username"
                placeholder="Enter your username"
                error={errors.username}
              />
              <Input
                onChangeText={(text) => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                iconName="lock-outline"
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                password
              />

              <Input
                onChangeText={(text) => handleOnchange(text, 'cpassword')}
                onFocus={() => handleError(null, 'cpassword')}
                iconName="lock-outline"
                label="Comfirm Password"
                placeholder="Comfirm your password"
                error={errors.cpassword}
                password
              />

              <ModifiedButton title="Register" onPress={validate} />
              <Text
                style={{
                  color: COLORS.white,
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                Already have an account?
              </Text>
              <Text
                onPress={() => navigation.navigate('SignInScreen')}
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 18,
                  textDecorationLine: 'underline',
                }}
              >
                Login
              </Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.iconsBox}>
          <Ionicons
            name="logo-google"
            style={styles.registerIcons}
            onPress={() => {
              {
                alert('Working on it!');
              }
            }}
          />
          <Ionicons
            name="logo-facebook"
            style={styles.registerIcons}
            onPress={() => {
              {
                alert('Working on it!');
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  rect: {
    width: 330,
    height: 550,
    backgroundColor: COLORS.lighterdarkGray,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    overflow: 'hidden',
    borderRadius: 20,
    margin: 20,
    alignSelf: 'center',
  },
  rectInside: {
    padding: 15,
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 80,
    height: 80,
    top: 30,
    margin: 15,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginText: {
    textAlign: 'center',
    top: 10,
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  emailInput: {
    textAlign: 'left',
    borderRadius: 20,
  },
  iconsBox: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    bottom: 0,
  },
  registerIcons: {
    color: COLORS.white,
    backgroundColor: 'transparent',
    fontSize: 35,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  button: {
    overflow: 'hidden',
  },
});

export default SignUpScreen;
