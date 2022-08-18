import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AudioPlayerModal from './AudioPlayerModal';

export const BookListHeader = () => {
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  return (
    <>
      <View style={styles.headerContainer}>
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={20}
          color="#000"
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          value={query}
          onChangeText={(newText) => setQuery(newText)}
          placeholder="Search"
          style={styles.textField}
        />
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <View>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://bit.ly/3Bcr48o')}
          >
            <Ionicons
              name="filter-sharp"
              style={styles.buyMeACoffe}
              color={'white'}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 10,
    height: 100,
    flex: 1,
    backgroundColor: '#23042F',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textField: {
    left: dimension / 4.85,
    width: '65%',
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'left',
    height: 30,
    bottom: 20,
    position: 'absolute',
    paddingLeft: 10
  },
  logo: {
    left: dimension / 22,
    bottom: 20,
    position: 'absolute',
    width: 35,
    height: 35
  },
  buyMeACoffe: {
    bottom: -30,
    left: dimension / 2.6,
    position: 'absolute'
  },
  searchIcon: {
    left: dimension / 6.7,
    bottom: 23,
    position: 'absolute',
    color: 'white'
  }
});
