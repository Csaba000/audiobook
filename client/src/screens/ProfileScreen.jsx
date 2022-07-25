import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text } from 'react-native';

const ProfilScreen = () => (
  <LinearGradient
    colors={['red', 'white']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <Text style={styles.text}>My Profile</Text>
  </LinearGradient>
);

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
