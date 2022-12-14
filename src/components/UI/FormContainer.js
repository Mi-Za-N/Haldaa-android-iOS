import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <Text style={styles.title}>{props.title}</Text> */}
            {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    title: {
        fontSize: 30,
    }
})

export default FormContainer;