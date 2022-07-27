import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const DetailedBook = () => {
  const route = useRoute();

  const { title, description, author, logo, duration } = route.params;

  return (

    <LinearGradient
      colors={['#6BBD99', '#284538']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>


      <ScrollView >
        <View style={styles.scrollableView}>
          <Image style={styles.logoImage} source={{ uri: logo }}></Image>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.authorText}>- {author} -</Text>
          <Text style={styles.descriptionText}>{description}{description}{description}{description}{description}{description}{description}</Text>
          <View style={styles.bottomView}>
            <Text style={styles.durationText}>Duration: {duration}</Text>
            <Ionicons name="download" color={'white'} size={35} style={styles.downloadIcon} onPress={() => { alert("Downloading") }} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6BBD99'
  },
  bookContainter: {
    height: 700,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 30,
    width: 340,
  },
  scrollableView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  titleText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  authorText: {
    fontSize: 18,
    color: 'white'
  },
  descriptionText: {
    fontSize: 15,
    padding: 20,
    color: 'white'
  },
  bottomView: {
    flexDirection: 'row',
    padding: 20
  },
  durationText: {
    fontSize: 15,
    color: 'white',
    position: 'absolute',
    right: 50
  },
  downloadIcon: {
    position: 'absolute',
    bottom: 15, left: 115
  },
  text: {
    color: '#fff',
    fontSize: 44,
  },
});

export default DetailedBook;
