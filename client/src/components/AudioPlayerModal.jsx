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
import { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AudioContext } from './AudioProvider';
import { CurrentAudio } from './CurrentAudioProvider';
import { CurrentAudioProvider } from './CurrentAudioProvider';
import AudioPlayer from './AudioPlayer';
import { AuthContext } from './AuthProvider';
import { headers } from '../utils/constants';
import { BACKEND_URL } from '../utils/constants';
import axios from 'axios';

export const AudioPlayerModal = ({ navigation }) => {
  // const route = useRoute();
  // const [statePlaybackStatus, setStatePlaybackStatus] = useState(null);
  // const [stateIsPlaying, setStateIsPlaying] = useState(false);
  // const [stateCurrentTime, setStateCurrentTime] = useState();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);
  const { token } = useContext(AuthContext);

   const { currentAudio, currentIndex, isPlaying, playbackStatus, currentTime } = useContext(CurrentAudio);

  const [stateCurrentAudio, setStateCurrentAudio] = currentAudio;
  const [stateCurrentIndex, setStateCurrentIndex] = currentIndex;
  const [stateIsPlaying, setStateIsPlaying] = isPlaying;
  const [statePlaybackStatus, setStatePlaybackStatus] = playbackStatus;
  const [stateCurrentTime, setStateCurrentTime] = currentTime;

  //token
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

  //playPauseAudio
  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && statePlaybackStatus === null) {
      const status = await playbackObject
        .loadAsync(
          { uri: `${data[stateCurrentIndex].url}.mp3` },
          { shouldPlay: true }
        )
        .catch((e) => {
          console.log(e);
        });
      setStateCurrentAudio(data[stateCurrentIndex]);

      playbackObject.setOnPlaybackStatusUpdate(async () => {
        if (playbackObject._loaded) {
          var result = await playbackObject.getStatusAsync();
          setStateCurrentTime(result.positionMillis);
        }
      });

      setStateIsPlaying(true);
      return setStatePlaybackStatus(status);
    }
    // It will pause our audio
    if (statePlaybackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setStateIsPlaying(false);
      return setStatePlaybackStatus(status);
    }

    // It will resume our audio
    if (!statePlaybackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setStateIsPlaying(true);
      return setStatePlaybackStatus(status);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.logoImage}
        source={{
          uri: `${stateCurrentAudio != null ? stateCurrentAudio.url : 'loading'}.jpg`
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {stateCurrentAudio != null ? stateCurrentAudio.title : 'loading'}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {stateCurrentAudio != null ? stateCurrentAudio.author : 'loading'}
        </Text>
      </View>

      <Ionicons 
      name={stateIsPlaying ? 'ios-pause-circle' : 'ios-play-circle'}
      style={styles.buttons} 
      size={45} 
      onPress={()=>{handleAudioPlayPause()}}></Ionicons>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderColor:'black',
    borderTopWidth: 2,

    // borderRadius: 10,
    bottom: 0,
    position: 'absolute',
    width: '100%',
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
    width: 200
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
