import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

const TransactionItem = ({data}) => {
    // console.log(data);

    return (
        <View style={{
            // height: 95,
            width: 295,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginHorizontal: 10,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            borderRadius: 5,
            elevation: 3,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 25
        }}>
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5a623'
            }}>
                <Image source={{ uri: data.image}}
                       style={styles.profileImg}/>
            </View>
            <View style={{flex: 1, marginHorizontal: 20}}>




            <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
                <Text numberOfLines={2} style={{fontSize: 14, fontWeight: 'bold', color: '#dc2929'}}>{data.location}</Text>
            </View>

          <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
            fontWeight:"bold",
          }}><Icon name="ios-bed-outline" color="gray" size={28} />{data.bed} Beds</Text>
        </View>
        <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
          }}><MatIcon name="toilet" color={`${data.isAttachedBath ===true? "red" : "#dcdcdc"}`} size={24} /> 
          {`${data.isAttachedBath ===true? "Attached" : "Not Attached"}`}</Text>
        </View>
        <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
            <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
          }}>
          <MatIcon name="wifi" color={`${data.isWifi ===true? "red" : "#dcdcdc"}`} size={24} />
          {`${data.isWifi ===true? "Available" : "Not Available"}`}
          </Text>
        </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
 profileImg: {
      width: 90, 
      height:120, 
      resizeMode: 'cover',
      borderRadius: 10,
    },
});

export default TransactionItem;