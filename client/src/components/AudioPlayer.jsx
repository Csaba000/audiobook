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
// import TrackPlayer from 'react-native-track-player';
import { Audio } from 'expo-av';
import { loadAsync } from 'expo-auth-session';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


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



const AudioPlayer = () => {
  const [sound, setSound] = useState();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);
  const route = useRoute();
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  var oldIndex = 0


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

  const changeAudio = async (songIndex, sound) => {
    if (oldIndex != songIndex) {
      const status = await sound.pauseAsync();
      setSoundIsPlaying(false)
      setSoundStatus({ status: status, icon: 'ios-play-circle' });
      oldIndex = songIndex
    }

  }

  useEffect(() => {
    scrollX.addListener(async ({ value }) => {
      const index = Math.round(value / width);
      setSongIndex(index);
      // console.log('SOUND', sound)
      // await changeAudio(index, sound)
      // console.log(index)

    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);


  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  // const [sound, setSound] = useState(null);
  const [soundStatus, setSoundStatus] = useState({ status: null, icon: 'ios-pause-circle' });
  const [music, setSoundIsPlaying] = useState(false);


  async function handleAudio() {


    //playing audio for the first time
    if (soundStatus.status === null) {
      console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: `${data[songIndex].url}.mp3`
        },
        { shouldPlay: true },
      );
      setSound(sound);
      setSoundIsPlaying(true);
      changeAudio(songIndex, sound)
      setSoundStatus({ status: status, icon: 'ios-pause-circle' });
    }
    console.log(oldIndex, songIndex)

    //pause audio
    if (soundStatus.status) {
      if (soundStatus.status.isLoaded && soundStatus.status.isPlaying) {
        const status = await sound.pauseAsync();
        console.log("pausing audio");
        setSoundIsPlaying(false)

        setSoundStatus({ status: status, icon: 'ios-play-circle' });
      }

      //resuming audio
      if (soundStatus.status.isLoaded && !soundStatus.status.isPlaying) {
        const status = await sound.playAsync();
        console.log("resuming audio");
        setSoundIsPlaying(true);
        setSoundStatus({ status: status, icon: 'ios-pause-circle' });
      }
    }
  }

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({ item }) => {
    return (

      <Animated.View style={styles.flatListContainer}>
        <View style={styles.wrapImage}>
          <Image style={styles.logoImage} source={{ uri: `${item.url}.jpg` }}></Image>
        </View>

        < View style={{ top: 40 }}>
          <Text style={styles.title}>{data[songIndex].title}</Text>
          <Text style={styles.author}>{data[songIndex]['author']}</Text>
        </View>

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>0:00</Text>
          <Text style={styles.progressLabelText}>
            {secondsToHms(data[songIndex].lengthInSeconds)}
          </Text>
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
          <Slider
            style={styles.sliderContainer}
            value={0}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="white"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onValueChange={async (value) => {
              // const valami = await sound.setPositionAsync()
              // valami.setCurrentPosition(value)
              // setCurrentPosition((value * sound.setPositionAsync()))
              // console.log(currentPosition)
            }}
          // onSlidingComplete={async(value) => {
          //   await sound.
          //  }}
          ></Slider>
        </View>

        <View style={styles.musicControls}>
          <Pressable
            onPress={() => {skipToPrevious(); changeAudio(songIndex, sound)}}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="white"
              style={{ marginTop: 15 }}

            ></Ionicons>

          </Pressable>

          <TouchableOpacity >
            <Ionicons name={music ? "ios-pause-circle" : "ios-play-circle"}
              size={60} color="white"
              onPress={() => handleAudio()}></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity >
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="white"
              style={{ marginTop: 15 }}
              onPress={() => {skipToNext();changeAudio(songIndex-1, sound)}}
            ></Ionicons>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView >
  );
};
export default AudioPlayer;

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
    bottom: 85,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    bottom: 70,
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    top: 150,
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
