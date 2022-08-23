import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import EasyButton from "../../components/UI/EasyButton";

const NotiList = ({item, onPress}) => {
    return (
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderColor: '#D3D3D3',
            backgroundColor: 'White',
        }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View>
                    <Image style={{width: 70, height: 80}} source={{uri: item.image}}/>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 16}}>
                <Text style={{fontSize: 16}}>{item.name}</Text>
          <View style={styles.buttonRow}>
          <EasyButton
            small
            primary
            onPress={onPress}               
            >
                <Text style={styles.buttonText}>Yes</Text>
          </EasyButton>
          <EasyButton
            small
            secondary
            // onPress={handleSubmit}               
            >
                <Text style={styles.buttonText}>No</Text>
          </EasyButton>
          </View>
                <Text style={{color: "#DD502C",paddingVertical: 2}}>{item.location}</Text>
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


export default NotiList;