import React from 'react';
import { TextInput, StyleSheet } from 'react-native'
import Colors  from '../../constants/Colors';

const DesignInput = (props) => {
    return (
        <TextInput
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
        width: '95%',
        height: 35,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.primary
    },
});

export default DesignInput;