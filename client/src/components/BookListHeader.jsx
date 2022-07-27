import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const BookListHeader = () => {
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  return (
    <View style={styles.headerContainer}>
      <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        value={query}
        onChangeText={(newText) => setQuery(newText)}
        placeholder="Search"
        style={styles.textField}
      />
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <View>
        <TouchableOpacity onPress={() => Linking.openURL('https://bit.ly/3Bcr48o')}>
          <Image
            source={require('../../assets/images/buymeacoffe.png')}
            style={styles.buyMeACoffe}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 10,
    height: 100,
    flex: 1,
    backgroundColor: '#AECFA4',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textField: {
    left: dimension/4.85,
    width: '57%',
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'left',
    height: 30,
    bottom: 20,
    position: 'absolute',
    paddingLeft: 10,
  },
  logo: {
    left: dimension/22,
    bottom: 20,
    position: 'absolute',
    width: 35,
    height: 35,
    // right: dimension / 2,
  },
  buyMeACoffe: {
    // bottom: 0,
    bottom: -70,
    left: dimension/4, 
    position: 'absolute',

    // left: dimension / 14,
    width: 110,
    height: 110,
  },
  searchIcon: {
    left: dimension/6.7,
    bottom: 23,
    position: 'absolute',
    // left: 105,
    color: 'white',
  },
});
