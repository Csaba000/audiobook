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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import COLORS from '../constants/colors';
import Loader from '../components/Loader';
import ModifiedButton from '../components/ModifiedButton';

const SignInScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (inputs.email == userData.email && inputs.password == userData.password) {
          navigation.navigate('HomeScreen');
          AsyncStorage.setItem('userData', JSON.stringify({ ...userData, loggedIn: true }));
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
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
                iconName="email-outline"
                label="Email"
                placeholder="Enter your email address"
                onChangeText={(text) => handleOnchange(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                error={errors.email}
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

              <ModifiedButton title="Log In" onPress={validate} />

              <Text
                style={{
                  color: COLORS.white,
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                Don't have an account?
              </Text>
              <Text
                onPress={() => navigation.navigate('SignUpScreen')}
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 18,
                  top: 10,
                  marginBottom: 20,
                  textDecorationLine: 'underline',
                }}
              >
                Register
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
    flex: 1,
    justifyContent: 'space-evenly',
  },
  rect: {
    width: 330,
    height: 400,
    backgroundColor: COLORS.lighterdarkGray,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    overflow: 'hidden',
    borderRadius: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rectInside: {
    padding: 15,
    paddingTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
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
});

export default SignInScreen;