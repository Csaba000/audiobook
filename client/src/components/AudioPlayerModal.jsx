import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useEffect } from '@react-navigation/native';
import axios from 'axios';

export const AudioPlayerModal = ({navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  console.log(id)
  useEffect(() => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
      axios
        .get(`${BACKEND_URL}/books/${id}`, headers)
        .then(({ data }) => {
          console.log(data);
          setData(data);
        })
        .catch((error) => console.log('Server error', error))
        .finally(() => setLoading(false));
    } else {
      console.log('Invalid token');
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.logoImage}
        source={{
          uri: 'https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=2000'
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          ASLDKSA:LDKA:DKA:DLKSAD:LKSAKLDJASLKJ
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          ASDJNSALJDALSKJDSALKAuthor
        </Text>
      </View>
      <Ionicons
        name="play-skip-back-outline"
        style={styles.buttons}
        size={38}
      ></Ionicons>
      <Ionicons name="play-circle" style={styles.buttons} size={38}></Ionicons>
      <Ionicons
        name="play-skip-forward-outline"
        style={styles.buttons}
        size={38}
      ></Ionicons>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    bottom: 118,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // borderRadius: 10,
    alignContent: 'center',
    backgroundColor: '#62466D',
    padding: 10
    // marginVertical: 8,
    // marginHorizontal: 16,
    // top: 8
  },
  buttons: {
    color: 'white'
  },
  textContainer: {
    padding: 5,
    flexDirection: 'column',
    width: 100
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  },
  author: {
    color: 'white'
  }
});

export default AudioPlayerModal;
