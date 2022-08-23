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
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
const { width, height } = Dimensions.get('window');


const ToletItem = ({data,onSelect}) => {
 // console.log("mizan",data.isAttachedBath);
 

  return (
    <TouchableOpacity  onPress={onSelect}>
    <Card style={styles.productMain}>
         <View style={{ overFlow: "hidden", paddingHorizontal:5}}>
       <Text style={{fontSize: 16,color: "#ff9900",fontWeight:"bold"}}>Posted:   
                {dayjs(data.createdAt).format("DD/MMM/YY")}</Text>
       </View>
       <View style={{
            width: width,
            alignItems: "flex-start",
        }}>
          <Text numberOfLines={1} style={{
            // width:250,
            color: Colors.secondary,
            fontSize:16
          }}>
          <Icon name="location" color="red" size={24} />
            {data.location}
          </Text>
        </View>


  <View style={{
            width: width,
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 1,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.3
        }}>
            <View style={{
                width: '100%',
                paddingVertical: 5,
                flexDirection: 'row',
                paddingLeft: 8,
                backgroundColor: 'white',
                alignItems: 'center'
            }}>
                <Image source={{ uri:data.image}}
                  style={ {
                  width: 115, 
                  height: 115, 
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}/>


     <View style={{flex:1}}>
       
       <View style={styles.detailContainer}>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
           <Text numberOfLines={1} style={styles.text}>
            {data.title}
          </Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
        <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#696969',
            fontSize:16,
          }}>BED <Icon name="ios-bed-outline" color="#a9a9a9" size={22} /> 
         <Text style={{fontWeight:"bold"}}> {data.bed}</Text> </Text>
        </View>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#696969',
            fontSize:16,
          }}><MatIcon name="vector-square" color="#a9a9a9" size={22} />
             Floor level:<Text style={{fontWeight:"bold"}}>{data.floor}</Text>
          </Text>

        </View>
      </View>

      <View style={styles.detailContainer}>
        
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: data.isAttachedBath ===true? "#228b22" : "#dcdcdc",
            fontSize:16,
          }}> <MatIcon name="toilet" color={`${data.isAttachedBath ===true? "#228b22" : "#dcdcdc"}`} size={24} />
          <Text style={{fontWeight:"bold"}}>{`${data.isAttachedBath ===true ? "Attached Bath": "Not Attached"}`}</Text>
          </Text>

        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: data.isWifi ===true? "#228b22" : "#dcdcdc",
            fontSize:16,
            fontWeight:"bold",
          }}>
         <MatIcon name="wifi" color={`${data.isWifi ===true? "#228b22" : "#dcdcdc"}`} size={24} />{`${data.isWifi ===true ? "Available": "Not available"}`}
          </Text>
        </View>
      </View>

        </View>
      </View>
    </View>


      {/* <View style={styles.imageContainer}>
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
           <MatIcon name="toilet" color={`${data.isAttachedBath ===true? "red" : "#dcdcdc"}`} size={28} />
           
        </View>
      </View> */}




      <View style={styles.PriceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
           color: '#000000',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Net Rent: {data.rent}৳
          </Text>
          </View>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: '#908090',
            fontSize:14,
            fontWeight:"bold",
         }}>
            Extra Cost: {data.additional_expenses}৳
          </Text>
        </View>
      </View>
    </Card>
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
    fontSize: 18,
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
     width: 280,
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
});

export default ToletItem;
