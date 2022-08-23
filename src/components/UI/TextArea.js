import React from 'react';
import { TextInput, StyleSheet } from 'react-native'
import Colors  from '../../constants/Colors';

const TextArea = (props) => {
    return (
        <TextInput
        multiline={true}
        numberOfLines={3}
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        >
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 90,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.primary
    },
});

export default TextArea;

