import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const UserEvent = ({data, onPress}) => {
    // console.log(data);
    return (
        
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderColor: '#D3D3D3',
            backgroundColor: 'White',
        }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View>
                    <Image style={{width: 70, height: 80}} source={{uri: data.event_Image}}/>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 16}}>
                <Text style={{fontSize: 16}}>{data.event_name}</Text>
  
                <Text style={{color: "#DD502C",paddingVertical: 2}}>
                 {data.event_description}
                 </Text>
            </View>

        </View>
    
    );
}

const styles = StyleSheet.create({
  buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 12
    },
    buttonRow: {
    paddingVertical:2,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    // width: "95%"
    },
});


export default UserEvent;