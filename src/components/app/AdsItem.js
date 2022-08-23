import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;

const AdsItem = ({ data}) => {
return (
        <View style={{
            height: 70,
            width: screenWidth - 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
            marginHorizontal: 10,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            borderRadius: 5,
            elevation: 3,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 15
        }}>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#272b43'}}>{data.title}</Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#272b43'}}>{data.type}</Text>
            </View>
             <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, color: '#a3a4ac', marginTop: 4}}>BDT {data.price}</Text>
            </View>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: data.status=="Reject" ? '#dc2929' : '#5ca30e'}}>{data.status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: { },
});

export default AdsItem;