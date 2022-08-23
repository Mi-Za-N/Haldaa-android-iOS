import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
const { width, height } = Dimensions.get('window');


const CourseItem = ({data,onSelect}) => {
  return (
    <TouchableOpacity  onPress={onSelect}>
      <Card style={styles.productMain}>
        <View style={styles.tilteContainer}>
         <View style={{ overFlow: "hidden", paddingHorizontal:5}}>
           <Text numberOfLines={2} style={styles.text}>
            {data.name}
          </Text>
          </View>
        </View>
            <View style={{
                width: width,
                paddingVertical: 5,
                paddingRight: 8,
                backgroundColor: 'white',
                alignItems: 'center',
                elevation: 1,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.3
            }}>
                <Image source={{ uri:data.image.Location}}
                  style={ {
                  width: "100%", 
                  height: 225, 
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}/>
            </View>


           <View style={{
                 width: width,
                 alignItems: "flex-start",
             }}>
               <Text numberOfLines={3} style={{
                 color: Colors.primary,
                 paddingHorizontal:10,
                 fontSize:16
               }}>
                 {data.description}
               </Text>
           </View>
    </Card>




    {/* <Card style={styles.productMain}>
         <Text numberOfLines={1} style={styles.text}>
            {data.title}
          </Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: data.image}} />
      </View>
      <View style={styles.detailContainer}>
        <Text numberOfLines={1} style={styles.date}>
          <Icon name="location" color="red" size={28} />
            {data.location}
          </Text>
        <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
            fontWeight:"bold",
          }}><Icon name="ios-bed-outline" color="gray" size={28} />{data.bed}</Text>
        </View>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
            fontWeight:"bold",
          }}><MatIcon name="toilet" color="gray" size={28} />{data.bath_room}</Text>
        </View>
      </View>
      <View style={styles.PriceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#f8f8ff',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Sale Price: {data.net_rent}৳
          </Text>
          </View>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: '#f5deb3',
            fontSize:14,
            fontWeight:"bold",
         }}>
            Extra Cost: {data.additional_expenses}৳
          </Text>
        </View>
      </View>
    </Card> */}
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
    productMain: {
    flex:1,
    width:"100%",
    height: "100%",
    justifyContent: "center",
    alignItems:"center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    margin: 3,  
  
  },
  date: {
     width:250,
    color: Colors.secondary,
    fontSize:16
  },
  text: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 210,
    padding: 3
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  detailContainer: {
     width: width,
     flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  tilteContainer: {
    width: width,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    paddingHorizontal: 5,
  },
  PriceContainer: {
     width: width,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical:3,
    backgroundColor:"#f0f8ff"
  },
  action: {
    flexDirection: "row",
    marginVertical: 5,
  },
  touchable: {
    flexDirection: "row",
    marginLeft: "30%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },


  // productMain: {
  //   flex:1,
  //   width:"100%",
  //   height: "100%",
  //   justifyContent: "center",
  //   alignItems:"center",
  //   borderBottomColor: "gray",
  //   borderBottomWidth: 1,
  //   margin: 3,  
  
  // },
  // date: {
  //   width:250,
  //   color: Colors.secondary,
  //   fontSize:16
  // },
  // text: {
  //   padding: 5,
  //   color: "black",
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   overflow: "hidden",
  // },
  // imageContainer: {
  //   width: "100%",
  //   height: 210,
  //   padding: 3
  // },
  // image: {
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "cover",
  //   borderRadius: 5,
  // },
  // detailContainer: {
  //    width: width,
  //    flexDirection: "row",
  //   justifyContent: "space-around",
  //   alignContent: "center",
  //   marginLeft: 3,
  // },
  // PriceContainer: {
  //    width: width,
  //    flexDirection: "row",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   padding:5,
  //   backgroundColor:"#778899"
  // },
  // action: {
  //   flexDirection: "row",
  //   marginVertical: 5,
  // },
  // touchable: {
  //   flexDirection: "row",
  //   marginLeft: "30%",
  //   justifyContent: "space-between",
  //   alignItems: "flex-end",
  // },
});

export default CourseItem;
