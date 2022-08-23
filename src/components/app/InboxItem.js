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
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
const { width, height } = Dimensions.get('window');

const InboxItem = ({data,onPress}) => {
     console.log(data)
  return (
    <TouchableOpacity  onPress={onPress}>
    <Card style={styles.productMain}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: data.image}} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.date}>
            22 Dec 2022
          </Text>
        <View style={{ overFlow: "hidden" }}>
          <Text style={styles.text}>
            {data.name}
          </Text>
          <Text style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            color: '#c0c0c0',
            width: '100%',
            // height: 30,
          }}>{data.description}</Text>
        </View>
      </View>
    </Card>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  productMain: {
    flex:1,
    height: 110,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    margin: 3,  
  
  },
  date: {
    color: Colors.secondary,
  },
  text: {
    paddingRight: 50,
    color: Colors.pText,
    fontSize: 13,
    fontWeight: "bold",
    overflow: "hidden",
    width: "90%",
  },
  imageContainer: {
    width: "35%",
    height: 110,
    padding: 3
  },
  image: {
    width: "100%",
    height: "95%",
    resizeMode: "contain",
    borderRadius: 5,
  },
  detailContainer: {
     width: width/1.2,
    justifyContent: "space-around",
    alignContent: "center",
    marginLeft: 3,
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

export default InboxItem;
