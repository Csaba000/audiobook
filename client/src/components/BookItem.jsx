import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const BookItem = ({ title, description, logo, author }) => (
    <TouchableNativeFeedback
        onPress={() => {
            alert(title);
        }}
    >
        <View style={styles.item}>
            <Image style={{ width: 100, height: 100, borderRadius: 100 }} source={{ uri: logo }} />
            <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Ionicons
                    style={{ alignSelf: 'flex-end', marginTop: -5, position: 'absolute' }}
                    name="heart-outline"
                    size={28}
                    color="white"
                    onPress={() => { { alert('Added to favorites') } }}
                />
                <Text style={styles.author}>{author}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text numberOfLines={2} style={styles.description}>
                        {description}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableNativeFeedback>
);


const styles = StyleSheet.create({
    item: {
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#555555',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        top: 8,
    },
    title: {
        color: 'white',
        paddingLeft: 8,
        fontSize: 17,
        fontWeight: 'bold',
    },
    author: {
        color: 'white',
        paddingLeft: 8,
        fontSize: 12,
    },
    description: {
        color: 'white',
        padding: 10,
        fontSize: 12.3,
        flexShrink: 1,
    },
});