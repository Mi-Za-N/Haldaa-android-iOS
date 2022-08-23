import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import Card from "../UI/Card";
import Icon from "react-native-vector-icons/Ionicons";


const { width } = Dimensions.get('window');


const CommunityItem = ({data,onSelect}) => {
  return (
        <TouchableOpacity
          style={{flex:1, width:width}}
          onPress={onSelect}>
          <Card>
            <View style={{
              flexDirection: 'row', 
              paddingHorizontal: 15, 
              alignItems: 'center',
              elevation: 3,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,

              }}>
                <Image 
                resizeMode="center"
                source={{ uri: data.idCard}}
                        style={{width: 120, height: 100, resizeMode: 'contain'}}
                  />
                <View style={{marginLeft: 15}}>
                    <Text style={{fontSize: 20, color: '#616161'}}>{data.name}</Text>
                    <Text style={{fontSize: 16, color: '#2f4f4f', marginTop: 4}}>{data.institute}</Text>
                    <Text style={{fontSize: 14, color: '#008080', marginTop: 4}}>Experience: {data.experience} years</Text>
                    {/* <Text style={{fontSize: 12, color: '#8c8c8c', marginTop: 4}}>{data.institute}</Text> */}
                </View>
            </View>
            <View style={{
                backgroundColor: 'white',
                marginHorizontal: 3,
                marginBottom: 5,
                padding: 15,
                elevation: 3,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
            }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#616161', marginBottom: 10}}>Interested Tutoring Location</Text>
                <Text style={{fontSize: 16, color: '#9e9e9e', lineHeight: 20}}>{data.tutoringLocation}</Text>
                <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                    {/* <Image source={require('../../assets/icon/ic_home_black.png')}
                            style={{width: 12, height: 12, resizeMode: 'contain'}}/> */}
                    <Text style={{flex: 1, fontSize: 14, color: '#2e8b57', marginLeft: 8}}>Expected Salary: {data.salary}</Text>
                    {/* <Image source={require('../../assets/icon/ic_dribbble.png')}
                            style={{width: 12, height: 12, resizeMode: 'contain'}}/> */}
                    <Text style={{flex: 1, fontSize: 14, color: '#616161', marginLeft: 8}}>{data.day} days per Week</Text>
                </View>
            </View>
          </Card>
        </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  productMain: {
    flex:1,
    height: 130,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    margin: 3,  
  
  },
  text: {
    paddingRight: 50,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    overflow: "hidden",
    // width: "90%",
  },
  title:{
    paddingRight: 50,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    overflow: "hidden",
    // width: "90%",
  },

  imageContainer: {
    height: 110,
  },


  detailContainer: {
     width: width/1.5,
    justifyContent: "space-around",
    alignContent: "center",
    // marginLeft: 3,
  },
  action: {
    flexDirection: "row",
  },
  touchable: {
    flexDirection: "row",
    // marginLeft: "30%",
  },
});

export default CommunityItem;
