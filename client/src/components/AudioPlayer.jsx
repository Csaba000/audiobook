import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { headers } from '../utils/constants';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { AuthContext } from './AuthProvider';
import { AudioContext } from './AudioProvider';
import { CurrentAudio } from './CurrentAudioProvider';


const { width, height } = Dimensions.get('window');

export const AudioPlayer = ({ navigation }) => {
  const flatlistRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  const { playbackObject, setPlaybackObject } = useContext(AudioContext);

  const { currentAudio, currentIndex, isPlaying, playbackStatus, currentTime } = useContext(CurrentAudio);
  const [stateCurrentAudio, setStateCurrentAudio] = currentAudio;
  const [stateCurrentIndex, setStateCurrentIndex] = currentIndex;
  const [stateIsPlaying, setStateIsPlaying] = isPlaying;
  const [statePlaybackStatus, setStatePlaybackStatus] = playbackStatus;
  const [stateCurrentTime, setStateCurrentTime] = currentTime;


  const route = useRoute();
  const { selectedId } = route.params;


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

  //scrollX
  useEffect(() => {
    if (playbackObject) {
      var x = 0;
      scrollX.addListener(async ({ value }) => {

        const indexNew = Math.round(value / width);
        if (x != indexNew) {
          setStateCurrentIndex(indexNew);
          swipeAudio(indexNew);
          x = indexNew;
        }
      });
    }
    return () => {
      // scrollX.removeAllListeners();
    };
  }, [data, playbackObject]);

  //mas screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      if (playbackObject != null) {
        try {
          playbackObject.setOnPlaybackStatusUpdate(null);
        } catch (error) {
          console.log('ERROR: ', error);
        }
      }
    });

    return unsubscribe;
  }, [navigation, playbackObject]);

  // jumpToIndex
  useFocusEffect(
    useCallback(() => {
      if (data) {
        setTimeout(() => {
            scrollToIndex();
            searchIndex(selectedId);
        }, 100);
      }
    }, [data, selectedId, playbackObject])
  );

  //valami
  useEffect(() => {
    if (data) {
      if (playbackObject != null && playbackObject._loaded == true) {
        const status = async () => {
          try {
            await playbackObject.stopAsync();
            await playbackObject.unloadAsync();
            console.log('Audio has been unloaded');
          } catch (error) {
            console.log(error);
          }
        };
        var x = searchIndex(selectedId);
        if (x == stateCurrentIndex) {
          return;
        } else {
          status();
        }
      }
    }
  }, [selectedId, playbackObject]);

  //initialize audio
  useEffect(() => {
    if (data) {
      if (playbackObject == null) {
        setPlaybackObject(new Audio.Sound());
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false
        });
        console.log('initialized');
      }
    }
  }, [data]);

  useEffect(() => {}, [playbackObject]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const searchIndex = (selectedId) => {
    for (var i = 0; i <= data.length - 1; ++i) {
      if (selectedId == data[i]._id) {
        setStateCurrentIndex(i);
        return i;
      }
    }
    return 0;
  };

  const scrollToIndex = async () => {
    var x = 0;

    var songId = searchIndex(selectedId);

    if (playbackObject != null) {
      if (playbackObject._loaded == true) {
        playbackObject.setOnPlaybackStatusUpdate(async () => {
          if (playbackObject._loaded) {
            try {
              var result = await playbackObject.getStatusAsync();
              setStateCurrentTime(result.positionMillis);
            } catch (error) {
              console.log(error);
            }
          }
        });
        setStateIsPlaying(false);
        try {
          const status = await playbackObject.stopAsync();
          await playbackObject.unloadAsync();
          console.log('Audio has been unloaded');
        } catch (error) {
          console.log('ERROR: ', error);
        }
      }

      if (stateCurrentIndex == 0) {
        playbackObject.setOnPlaybackStatusUpdate(async () => {
          if (playbackObject._loaded) {
            var result = await playbackObject.getStatusAsync();
            setStateCurrentTime(result.positionMillis);
          }
        });

        setStateIsPlaying(false);
        if (playbackObject._loaded == true) {
          try {
            const status = await playbackObject.stopAsync();
            await playbackObject.unloadAsync();
            console.log('Audio has been unloaded');
          } catch (error) {
            console.log('ERROR: ', error);
          }
        }
      }

      if (playbackObject._loading == false) {
        const status2 = await playbackObject
        .loadAsync(
            { uri: `${data[stateCurrentIndex].url}.mp3` },
            { shouldPlay: true }
            )
            .catch((e) => {
              console.log(e);
            });
        setStateCurrentAudio(data[stateCurrentIndex]);
        setStateCurrentIndex(songId);
        setStateIsPlaying(true);
        setStatePlaybackStatus(status2);

        flatlistRef.current.scrollToIndex({ animated: false, index: songId });
      }
    }
  };

  const swipeAudio = async (songIndex) => {
    if (playbackObject != null) {
      if (playbackObject._loaded == true) {
        playbackObject.setOnPlaybackStatusUpdate(async () => {
          if (playbackObject._loaded) {
            var result = await playbackObject.getStatusAsync();
            setStateCurrentTime(result.positionMillis);
          }
        });
        try {
          const status = await playbackObject.stopAsync();
          await playbackObject.unloadAsync();
          console.log('Audio has been unloaded');
        } catch (error) {
          console.log('ERROR: ', error);
        }
        setStateIsPlaying(false);
      }
      if (playbackObject._loading == false) {
        const status2 = await playbackObject
          .loadAsync(
            { uri: `${data[songIndex].url}.mp3` },
            { shouldPlay: true }
          )
          .catch((e) => {
            console.log(e);
          });
        setStateCurrentAudio(data[songIndex]);

        setStateCurrentIndex(songIndex);
        setStateIsPlaying(true);
        setStatePlaybackStatus(status2);
      }
    }
  };

  const changeAudio = async (songIndexPara) => {
    var oldIndex = stateCurrentIndex;

    if (oldIndex != songIndexPara) {
      oldIndex = songIndexPara;

      if (playbackObject != null) {
        const status = await playbackObject.stopAsync();
        try {
          await playbackObject.unloadAsync();
          console.log('Audio has been unloaded');
          setStateIsPlaying(false);
          setStatePlaybackStatus(status);
        } catch (error) {
          console.log('ERROR: ', error);
        }
      }
      const status2 = await playbackObject
        .loadAsync(
          { uri: `${data[songIndexPara].url}.mp3` },
          { shouldPlay: true }
        )
        .catch((e) => {
          console.log('ERROR', e);
        });
      setStateCurrentAudio(data[stateCurrentIndex]);

      setStateIsPlaying(true);
      setStatePlaybackStatus(status2);
    }
  };

  const handleAudioPlayPause = async () => {
    console.log(data[stateCurrentIndex]);
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

  const skipToNext = async () => {
    if (stateCurrentIndex > data.length - 2) {
      return;
    }
    setStateCurrentTime(0);

    var nextSongIndex = stateCurrentIndex + 1;
    setStateCurrentIndex(nextSongIndex);

    await flatlistRef.current.scrollToOffset({
      offset: nextSongIndex * width
    });

    changeAudio(nextSongIndex);
  };

  const skipToPrevious = async () => {
    if (stateCurrentIndex - 1 < 0) {
      return;
    }
    setStateCurrentTime(0);

    var previousSongIndex = stateCurrentIndex - 1;
    setStateCurrentIndex(previousSongIndex);

    flatlistRef.current.scrollToOffset({
      offset: previousSongIndex * width
    });

    changeAudio(previousSongIndex);
  };

  const renderSongs = ({ item }) => {
    return (
      <Animated.View style={styles.flatListContainer}>
        <View style={styles.wrapImage}>
          <Image
            style={styles.logoImage}
            source={{ uri: `${item.url}.jpg` }}
          ></Image>
        </View>

        <View style={{ top: 40 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {stateCurrentTime ? millisToMinutesAndSeconds(stateCurrentTime) : '0:00'}
          </Text>
          <Text style={styles.progressLabelText}>
            {statePlaybackStatus
              ? millisToMinutesAndSeconds(statePlaybackStatus.durationMillis)
              : 'loading...'}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Animated.FlatList
          ref={flatlistRef}
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
                  contentOffset: { x: scrollX }
                }
              }
            ],
            { useNativeDriver: false }
          )}
        ></Animated.FlatList>

        <View>
          <Slider
            style={styles.sliderContainer}
            value={stateCurrentTime}
            minimumValue={0}
            maximumValue={statePlaybackStatus ? statePlaybackStatus.durationMillis : 0}
            thumbTintColor="white"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onValueChange={async (value) => {
              await playbackObject.setPositionAsync(value);
            }}
            onSlidingComplete={async (value) => {
              if (
                millisToMinutesAndSeconds(value) ==
                millisToMinutesAndSeconds(statePlaybackStatus.durationMillis)
              ) {
                skipToNext();
              }
              await playbackObject.setPositionAsync(value);
            }}
          ></Slider>
        </View>

        <View style={styles.musicControls}>
          <Pressable
            onPress={() => {
              skipToPrevious();
            }}
          >
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="white"
              style={{ marginTop: 15 }}
            ></Ionicons>
          </Pressable>

          <TouchableOpacity>
            <Ionicons
              name={stateIsPlaying ? 'ios-pause-circle' : 'ios-play-circle'}
              size={60}
              color="white"
              onPress={() => handleAudioPlayPause()}
            ></Ionicons>
          </TouchableOpacity>

          <Pressable>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="white"
              style={{ marginTop: 15 }}
              onPress={() => {
                skipToNext();
              }}
            ></Ionicons>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#391B45'
  },
  wrapImage: {
    width: 300,
    height: 340,
    elevation: 10,
    marginBottom: 25
  },
  flatListContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    marginTop: 50,
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    bottom: 85,
    flexDirection: 'row'
  },
  progressLabelContainer: {
    bottom: 70,
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressLabelText: {
    top: 130,
    color: 'white'
  },
  musicControls: {
    flexDirection: 'row',
    width: '60%',
    marginTop: 15,
    bottom: 65,
    justifyContent: 'space-between'
  },
  title: {
    marginBottom: 80,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE'
  },
  author: {
    bottom: 70,
    color: '#d6cece',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const styles2 = StyleSheet.create({
  mainContainer: {
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
