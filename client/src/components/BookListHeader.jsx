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
    height: 55,
    flex: 1,
    backgroundColor: '#AECFA4',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textField: {
    left: 90,
    width: '35%',
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'left',
    height: 30,
    paddingLeft: 10,
  },
  logo: {
    width: 35,
    height: 35,
    right: dimension / 2,
  },
  buyMeACoffe: {
    left: dimension / 14,
    width: 110,
    height: 110,
  },
  searchIcon: {
    left: 105,
    color: 'white',
  },
});
