import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { AuthContext } from '../components/AuthProvider';

// import { getToken } from './HomeScreen';

const headers = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": ''
  }
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

const DetailedBook = () => {
  const route = useRoute();
  const [isLoading, setLoading] = useState(true);
  const {token} = useContext(AuthContext)
  const { id } = route.params;

  const [data, setData] = useState([]);
  useEffect(() => {
    // getToken().then((token) => {
      if (token) {
      console.log(token);
      headers.headers.Authorization = `Bearer ${token}`
      axios.get(`${BACKEND_URL}/books/${id}`, headers)
        .then(({ data }) => {
          console.log('setdata-DetailedBook')
          setData(data)
        }).catch((error) => console.log('Server error', error))
        .finally(() => setLoading(false));
    }
    else {
      console.log('Error token')
    }
    // })
  }, []);

  return (

    <LinearGradient
      colors={['#866B90', '#2101']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <ScrollView >
        <View style={styles.scrollableView}>
          <Image style={styles.logoImage} source={{ uri: data.coverUrl }}></Image>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.authorText}>- {data.author} -</Text>
          <Text style={styles.descriptionText}>{data.description}</Text>
          <View style={styles.bottomView}>
            <Text style={styles.durationText}>Duration: {secondsToHms(data.lengthInSeconds)}</Text>
            <Ionicons name="download" color={'white'} size={35} style={styles.downloadIcon}
              onPress={() => { console.log(token) }} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6BBD99'
  },
  bookContainter: {
    height: 700,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 30,
    width: 340,
  },
  scrollableView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  titleText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  authorText: {
    fontSize: 18,
    color: 'white'
  },
  descriptionText: {
    fontSize: 15,
    padding: 20,
    color: 'white'
  },
  bottomView: {
    flexDirection: 'row',
    padding: 20
  },
  durationText: {
    fontSize: 13,
    color: 'white',
    position: 'absolute',
    right: -50
  },
  downloadIcon: {
    position: 'absolute',
    bottom: 15, left: 115
  },
  text: {
    color: '#fff',
    fontSize: 44,
  },
});

export default DetailedBook;
