import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({ label, iconName, error, password, onFocus = () => {}, ...props }) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 3 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? COLORS.red : isFocused ? COLORS.darkBlue : 'transparent',
            alignItems: 'center',
          },
        ]}
      >
        <Icon name={iconName} style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLORS.white, flex: 1 }}
          placeholderTextColor={COLORS.grey}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ color: COLORS.darkBlue, fontSize: 22 }}
          />
        )}
      </View>
      {error && <Text style={{ color: COLORS.red, fontSize: 12 }}>{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.white,
  },
  inputContainer: {
    color: COLORS.white,
    height: 55,
    backgroundColor: COLORS.textfieldgray,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 25,
    elevation: 10,
  },
});

export default Input;
