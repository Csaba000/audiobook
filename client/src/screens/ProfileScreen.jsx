import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { LoginContext } from '../components/IsLoggedIn';
import ModifiedButton from '../components/ModifiedButton';

const ProfilScreen = () => {
  const { setIsLoggedIn } = useContext(LoginContext);

  return (
    <LinearGradient
      colors={['red', 'white']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ModifiedButton
        title="LogOut"
        onPress={async () => {
          let s = await AsyncStorage.getItem('token');
          await AsyncStorage.clear();
          let x = await AsyncStorage.getItem('token');
          console.log(s);
          console.log(x);
          setIsLoggedIn(false);
        }}
      ></ModifiedButton>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 44,
  },
});

export default ProfilScreen;
