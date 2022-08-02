import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import COLORS from '../constants/colors';
import Loader from '../components/Loader';
import ModifiedButton from '../components/ModifiedButton';
import { LoginContext } from '../components/IsLoggedIn';
import { BACKEND_URL } from '../utils/constants';
import axios from 'axios';
import HomeScreen from './HomeScreen';
import { StackActions } from '@react-navigation/native';

const SignInScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(LoginContext);

  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      // setIsLoggedIn(true);
      login();
    }
  };

  const sendData = () => {
    console.log(BACKEND_URL);
    axios.post(`${BACKEND_URL}/users/login`, { email: inputs.email, password: inputs.password })
      .then(async (response) => {
        await AsyncStorage.setItem('token', JSON.stringify(response.data))
      }).
      catch(function (error) { console.log(error) });
  }

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const login = () => {
    sendData();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let token = await AsyncStorage.getItem('token');
      let userData = await AsyncStorage.getItem('userData');

      if (token != '{}') {
        AsyncStorage.setItem('userData', JSON.stringify({ ...userData, loggedIn: true }));
        setIsLoggedIn(true);
      } else {
        Alert.alert('Error', 'Invalid Details');
      }
    }, 100);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.tabbar, flex: 1 }}>
      <Loader visible={loading} />
      <View style={styles.container}>
        <Image source={require('../assets/logo2.png')} resizeMode="contain" style={styles.image} />
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

              <ModifiedButton title="Log In" onPress={() => { validate() }} />

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
                setLoggedIn(false);
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
    justifyContent: 'center',
  },
  rect: {
    width: 330,
    height: 400,
    backgroundColor: COLORS.background,
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
    width: 120,
    height: 120,
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
