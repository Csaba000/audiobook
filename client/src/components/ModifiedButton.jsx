import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { style } from 'styled-system';
import COLORS from '../constants/colors';
const ModifiedButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: '100%',
    backgroundColor: COLORS.blue,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  text: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ModifiedButton;
