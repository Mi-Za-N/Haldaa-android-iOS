import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const AdsColumn = ({ }) => {
  return (
          <View style={{
            height: 50,
            width: screenWidth - 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 5,
            marginHorizontal: 15,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 5,
            borderRadius: 5,
            backgroundColor: '#dcdcdc',
            paddingHorizontal: 10,
            paddingVertical: 15
        }}>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#272b43'}}>Category</Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#272b43'}}>Type</Text>
            </View>
             <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#272b43'}}>Price</Text>
            </View>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#272b43'}}>Status</Text>
        </View>
  );
};

const styles = StyleSheet.create({
    Container: { },
});

export default AdsColumn;