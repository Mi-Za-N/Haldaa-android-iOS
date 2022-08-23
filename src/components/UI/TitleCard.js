import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

  const TitleCard =({text}) => {
    return (
        <View style={{ marginHorizontal: 15}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#272b43'}}>{text}</Text>
        </View>
    );
}


export default TitleCard;