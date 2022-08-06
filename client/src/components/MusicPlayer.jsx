import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import { headers } from '../utils/constants';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ':' : ':') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ':' : ':') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ':' : 's') : '';
  return hDisplay + mDisplay + sDisplay;
}

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);
  const route = useRoute();
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;
      axios
        .get(`${BACKEND_URL}/books`, headers)
        .then(({ data }) => {
          setData(data);
        })
        .catch((error) => alert('Server error: ', error))
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      alert('Login token is not good');
    }
  }, []);


  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    //   console.log(data[songIndex]['title'])
    });
    return () => {
    //   scrollX.removeAllListeners();
    };
  }, []);

//   console.log('DATA ',data)
//   console.log(songIndex)

  const skipToNext = () => {
    console.log('elore');
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    console.log('hatra');
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({ item }) => {
    return (
      <Animated.View style={styles.flatListContainer}>
        <View style={styles.wrapImage}>
          <Image style={styles.logoImage} source={{ uri: item.coverUrl }}></Image>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={data}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: false }
          )}
        ></Animated.FlatList>

        <View>
          {/* <Text style={styles.title}>{data[songIndex].title}</Text> */}
          {/* <Text style={styles.author}>{data[songIndex]['author']}</Text> */}
        </View>

        <View>
          <Slider
            style={styles.sliderContainer}
            value={0}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="white"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingCompelte={() => {}}
          ></Slider>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelText}>0:00</Text>
            <Text style={styles.progressLabelText}>
              {/* {secondsToHms(data[songIndex]['lengthInSeconds'])} */}
            </Text>
          </View>
        </View>

        <View style={styles.musicControls}>
          <TouchableOpacity onpress={skipToPrevious}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="white"
              style={{ marginTop: 15 }}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onpress={() => {}}>
            <Ionicons name="ios-pause-circle" size={60} color="white"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onpress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="white"
              style={{ marginTop: 15 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MusicPlayer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#391B45',
  },
  wrapImage: {
    width: 300,
    height: 340,
    elevation: 10,
    marginBottom: 25,
  },
  flatListContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    marginTop: 50,
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    bottom: 70,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    bottom: 70,
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: 'white',
  },
  musicControls: {
    flexDirection: 'row',
    width: '60%',
    marginTop: 15,
    bottom: 65,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 80,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  author: {
    bottom: 70,
    color: '#d6cece',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
