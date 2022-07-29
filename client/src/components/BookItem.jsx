import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const BookItem = ({ title, description, coverUrl, author, navigation, lengthInSeconds, id }) => {

    const [iconName, setIconName] = useState('heart-outline');

    return (
        <TouchableNativeFeedback
            onPress={() => {
                navigation.navigate('DetailedBook', { id: id })
            }}
        >
            <View style={styles.item}>
                <Image style={styles.logoImage} source={{ uri: coverUrl }} />
                <View style={styles.viewContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    <Ionicons
                        style={styles.favoriteIcon}
                        name={iconName}
                        size={28}
                        color="white"
                        onPress={() => {
                            if (iconName == 'heart-outline') {
                                setIconName('heart-sharp')
                            }
                            if (iconName == 'heart-sharp') {
                                setIconName('heart-outline')
                            }
                        }}
                    />
                    <Text style={styles.author}>{author}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={2} style={styles.description}>
                            {description}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={2} style={styles.durationText}>Duration: {lengthInSeconds}s
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>

    )
};


const styles = StyleSheet.create({
    item: {
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#62466D',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        top: 8,
    },
    title: {
        marginRight: 25,
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
    logoImage: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    viewContainer: {
        flexDirection: 'column',
        flexShrink: 1
    },
    favoriteIcon: {
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute'
    },
    durationText: {
        fontSize: 10,
        color: 'white',
        flexShrink: 1,
        paddingLeft: 10
    }
});