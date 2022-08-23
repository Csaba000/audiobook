import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
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

const { width, height } = Dimensions.get('window');

const AudioPlayer = ({ navigation }) => {
  const flatlistRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState();
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
          setSongIndex(indexNew);
          swipeAudio(indexNew);
          x = indexNew;
        }
      });
    }
    return () => {
      scrollX.removeAllListeners();
    };
  }, [data, playbackObject]);

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
        if (x == songIndex) {
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
        console.log('INITIALIZE');
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        console.log('initialized');
      }
    }
  }, [data]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const searchIndex = (selectedId) => {
    for (var i = 0; i <= data.length - 1; ++i) {
      if (selectedId == data[i]._id) {
        setSongIndex(i);
        return i;
      }
    }
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
              setCurrentTime(result.positionMillis);
            } catch (error) {
              console.log(error);
            }
          }
        });
        setIsPlaying(false);
        try {
          const status = await playbackObject.stopAsync();
          await playbackObject.unloadAsync();
          console.log('Audio has been unloaded');
        } catch (error) {
          console.log('ERROR: ', error);
        }
      }

      if (songIndex == 0) {
        playbackObject.setOnPlaybackStatusUpdate(async () => {
          if (playbackObject._loaded) {
            var result = await playbackObject.getStatusAsync();
            setCurrentTime(result.positionMillis);
          }
        });

        setIsPlaying(false);
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
          .loadAsync({ uri: `${data[songIndex].url}.mp3` }, { shouldPlay: true })
          .catch((e) => {
            console.log(e);
          });

        setSongIndex(songId);
        setIsPlaying(true);
        setPlaybackStatus(status2);
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
            setCurrentTime(result.positionMillis);
          }
        });
        try {
          const status = await playbackObject.stopAsync();
          await playbackObject.unloadAsync();
          console.log('Audio has been unloaded');
        } catch (error) {
          console.log('ERROR: ', error);
        }
        setIsPlaying(false);
      }
      if (playbackObject._loading == false) {
        const status2 = await playbackObject
          .loadAsync({ uri: `${data[songIndex].url}.mp3` }, { shouldPlay: true })
          .catch((e) => {
            console.log(e);
          });
        setSongIndex(songIndex);
        setIsPlaying(true);
        setPlaybackStatus(status2);
      }
    }
  };

  const changeAudio = async (songIndexPara) => {
    var oldIndex = songIndex;

    if (oldIndex != songIndexPara) {
      oldIndex = songIndexPara;

      if (playbackObject != null) {
        const status = await playbackObject.stopAsync();
        try {
          await playbackObject.unloadAsync();
          console.log('Audio has been unloaded');
          setIsPlaying(false);
          setPlaybackStatus(status);
        } catch (error) {
          console.log('ERROR: ', error);
        }
      }
      const status2 = await playbackObject
        .loadAsync({ uri: `${data[songIndexPara].url}.mp3` }, { shouldPlay: true })
        .catch((e) => {
          console.log('ERROR', e);
        });
      setIsPlaying(true);
      setPlaybackStatus(status2);
    }
  };

  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject
        .loadAsync({ uri: `${data[songIndex].url}.mp3` }, { shouldPlay: true })
        .catch((e) => {
          console.log(e);
        });

      playbackObject.setOnPlaybackStatusUpdate(async () => {
        if (playbackObject._loaded) {
          var result = await playbackObject.getStatusAsync();
          setCurrentTime(result.positionMillis);
        }
      });

      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
    // It will pause our audio
    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }

    // It will resume our audio
    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };

  const skipToNext = async () => {
    if (songIndex > data.length - 2) {
      return;
    }
    setCurrentTime(0);

    var nextSongIndex = songIndex + 1;
    setSongIndex(nextSongIndex);

    await flatlistRef.current.scrollToOffset({
      offset: nextSongIndex * width,
    });

    changeAudio(nextSongIndex);
  };

  const skipToPrevious = async () => {
    if (songIndex - 1 < 0) {
      return;
    }
    setCurrentTime(0);

    var previousSongIndex = songIndex - 1;
    setSongIndex(previousSongIndex);

    flatlistRef.current.scrollToOffset({
      offset: previousSongIndex * width,
    });

    changeAudio(previousSongIndex);
  };

  const renderSongs = ({ item }) => {
    return (
      <Animated.View style={styles.flatListContainer}>
        <View style={styles.wrapImage}>
          <Image style={styles.logoImage} source={{ uri: `${item.url}.jpg` }}></Image>
        </View>

        <View style={{ top: 40 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {currentTime ? millisToMinutesAndSeconds(currentTime) : '0:00'}
          </Text>
          <Text style={styles.progressLabelText}>
            {playbackStatus
              ? millisToMinutesAndSeconds(playbackStatus.durationMillis)
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
            value={currentTime}
            minimumValue={0}
            maximumValue={playbackStatus ? playbackStatus.durationMillis : 0}
            thumbTintColor="white"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onValueChange={async (value) => {
              await playbackObject.setPositionAsync(value);
            }}
            onSlidingComplete={async (value) => {
              if (
                millisToMinutesAndSeconds(value) ==
                millisToMinutesAndSeconds(playbackStatus.durationMillis)
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
              name={isPlaying ? 'ios-pause-circle' : 'ios-play-circle'}
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
    top: 140,
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
