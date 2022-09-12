import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AudioContext } from './AudioProvider';
import { CurrentAudio } from './CurrentAudioProvider';
import AudioPlayer from './AudioPlayer';
import axios from 'axios';

export const AudioPlayerModal = ({ navigation }) => {
  // const route = useRoute();
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);
  const { currentAudio, setCurrentAudio } = useContext(CurrentAudio);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState();

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.logoImage}
        source={{
          uri: `${currentAudio != null ? currentAudio.data.url : 'loading'}.jpg`,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {currentAudio != null ? currentAudio.data.title : 'loading'}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {currentAudio != null ? currentAudio.data.author : 'loading'}
        </Text>
      </View>
      <Ionicons name="play-skip-back-outline" style={styles.buttons} size={38}></Ionicons>
      <Ionicons name="play-circle" style={styles.buttons} size={38}></Ionicons>
      <Ionicons name="play-skip-forward-outline" style={styles.buttons} size={38}></Ionicons>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // bottom: 118,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // borderRadius: 10,
    alignContent: 'center',
    backgroundColor: '#62466D',
    padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 16,
    // top: 8
  },
  buttons: {
    color: 'white',
  },
  textContainer: {
    padding: 5,
    flexDirection: 'column',
    width: 100,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  author: {
    color: 'white',
  },
});

export default AudioPlayerModal;
