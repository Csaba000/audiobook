import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import _, { groupBy, merge, round } from 'lodash';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { headers } from '../utils/constants';
import { AuthContext } from '../components/AuthProvider';
import { LoginContext } from '../components/IsLoggedIn';
import { BookListHeader } from '../components/BookListHeader';
import DetailedBook from './DetailedBook';
import { SearchBar } from 'react-native-screens';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { filter } from 'lodash';
import { AudioContext } from '../components/AudioProvider';
import AudioPlayerModal from '../components/AudioPlayerModal';
import { CurrentAudio } from '../components/CurrentAudioProvider';

const CategoriesScreen = ({ navigation }) => {
  const [myData, setMyData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [groupedBooks, setGroupedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const { currentAudio, currentIndex } = useContext(CurrentAudio);
  const { playbackObject, setPlaybackObject } = useContext(AudioContext);

  const { token, setToken } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (token) {
      headers.headers.Authorization = `Bearer ${token}`;

      axios
        .get(`${BACKEND_URL}/books`, headers)
        .then((response) => {
          setMyData(response.data);
          const books = response.data;
          //console.log(books);
          const byCategory = _(books)
            .groupBy((book) => book.category)
            .map((value, key) => ({ category: key, data: value }))
            .value();

          // setFilteredBooks(null);
          // console.log(filteredBooks);

          // setGroupedBooks([byCategory]);
          setGroupedBooks(byCategory);
          setMyData(books);

          //console.log(myData);
          //console.log(groupedBooks);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, []);

  const searchFilterFunction = (text) => {
    const bookData = myData.map((Book) => {
      const { _id, category, title, author, url } = Book;
      return {
        _id,
        category,
        title,
        author,
        url,
      };
    });
    //console.log(bookData);
    if (text.trim().length !== 0) {
      const newData = bookData.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase() + item.author.toUpperCase() + item.category.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      //console.log(newData);
      setFilteredBooks(newData);
    }
    //console.log(filteredBooks);
    setSearch(text);
  };

  // const Search = ({}) => {
  //   return (
  //     <View style={{ marginBottom: -10, marginTop: 30, margin: 5 }}>
  //       <View
  //         style={[
  //           styles.inputContainer,
  //           {
  //             alignItems: 'center',
  //           },
  //         ]}
  //       >
  //         <Ionicons name="search" style={{ color: COLORS.box, fontSize: 22, marginRight: 10 }} />
  //         <TextInput
  //           autoCorrect={false}
  //           //autoCapitalize="none"
  //           // clearButtonMode="always"
  //           style={{ color: COLORS.white, flex: 1 }}
  //           placeholderTextColor={COLORS.grey}
  //           placeholder="Search..."
  //           onChangeText={(text) => searchFilterFunction(text)}
  //           value={search}
  //           defaultValue={null}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  const BookItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailedBook', { id: item._id })}>
          <Image
            source={{
              uri: `${item.url}.jpg`,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };

  const FilteredBookItem = ({ item }) => {
    return (
      <View style={{ margin: 10, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailedBook', { id: item._id })}>
          <Image
            source={{
              uri: `${item.url}.jpg`,
            }}
            style={styles.itemPhotoFiltered}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.itemTextFiltered}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginTop: 30, paddingBottom: 10, paddingHorizontal: 10 }}>
          <View
            style={[
              styles.inputContainer,
              {
                alignItems: 'center',
              },
            ]}
          >
            <Ionicons name="search" style={{ color: COLORS.box, fontSize: 22, marginRight: 10 }} />
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              //clearButtonMode="always"
              style={{ color: COLORS.white, flex: 1 }}
              placeholderTextColor={COLORS.grey}
              placeholder="Search..."
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              defaultValue={null}
              autoComplete="off"
            />
          </View>
          
        </View>
        {search ? (
          <FlatList
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={filteredBooks}
            renderItem={({ item }) => <FilteredBookItem item={item} />}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            style={{ paddingBottom: 5 }}
          ></FlatList>
        ) : (
          <SectionList
            keyExtractor={(section, index) => index}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            style={styles.sectionsStyle}
            sections={groupedBooks}
            // ListHeaderComponent={
            //   <View style={{ marginBottom: 3 }}>
            //     <View
            //       style={[
            //         styles.inputContainer,
            //         {
            //           alignItems: 'center',
            //         },
            //       ]}
            //     >
            //       <Ionicons
            //         name="search"
            //         style={{ color: COLORS.box, fontSize: 22, marginRight: 10 }}
            //       />
            //       <TextInput
            //         autoCorrect={false}
            //         //autoCapitalize="none"
            //         // clearButtonMode="always"
            //         style={{ color: COLORS.white, flex: 1 }}
            //         placeholderTextColor={COLORS.grey}
            //         placeholder="Search..."
            //         onChangeText={(text) => searchFilterFunction(text)}
            //         value={search}
            //         defaultValue={null}
            //       />
            //     </View>
            //   </View>
            // }
            removeClippedSubviews={false}
            renderSectionHeader={({ section }) => (
              <>
                <View>
                  <Text style={styles.sectionHeader}>{section.category}</Text>
                  <FlatList
                    horizontal
                    keyExtractor={(item) => item._id}
                    data={section.data}
                    extraData={filteredBooks}
                    renderItem={({ item }) => <BookItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </>
            )}
            renderItem={({ item, section }) => {
              return null;
            }}
          ></SectionList>
        )}
      </SafeAreaView>
      {playbackObject != null ? (
      <AudioPlayerModal></AudioPlayerModal>
    ) : (
      <View></View>
    )}
    </View>
  );
};

const dimension = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    left: 1,
    right: 1,
    backgroundColor: '#391B45',
  },
  sectionsStyle: {
    flex: 1,
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
    alignContent: 'center',
    textAlign: 'left',
    borderRadius: 10,
  },
  sectionStyle: { marginVertical: 5 },
  item: {
    margin: 5,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemPhotoFiltered: {
    width: 100,
    height: 100,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
    textAlign: 'justify',
  },
  itemTextFiltered: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
    textAlign: 'justify',
    margin: 10,
  },
  search: {
    height: 50,
    flex: 1,
    backgroundColor: '#23042F',
    borderRadius: 10,
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
    paddingLeft: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.white,
  },
  inputContainer: {
    color: COLORS.white,
    height: 55,
    backgroundColor: COLORS.inputBackground,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 25,
    elevation: 10,
  },
});

export default CategoriesScreen;
