import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AudioContext } from '../components/AudioProvider';
import AudioPlayerModal from '../components/AudioPlayerModal';
import { CurrentAudio } from '../components/CurrentAudioProvider';
import AudioPlayer from '../components/AudioPlayer';
import { AudioDisplayContext } from '../components/AudioDisplayProvider';
// import { CurrentAudio } from '../components/CurrentAudioProvider';

const FavoritesScreen = () => {
  const { audioDisplay, setAudioDisplay } = useContext(AudioDisplayContext);
  const { currentAudio, currentIndex } = useContext(CurrentAudio);
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);


  const [stateCurrentAudio, setStateCurrentAudio] = currentAudio;
  const [stateCurrentIndex, setStateCurrentIndex] = currentIndex;


  return (
    <LinearGradient
      colors={['blue', 'white']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.text}>Favorites</Text>

      {playbackObject != null ? (
        <AudioPlayerModal></AudioPlayerModal>
      ) : (
        <View></View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 44
  }
});

export default FavoritesScreen;
