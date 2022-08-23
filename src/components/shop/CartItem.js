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

const CartItem = ({data, onDecrease, onIncrease, onDelete}) => {
  return (
    <Card style={styles.productMain}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: data.image}} />
      </View>
      <View style={styles.detailContainer}>
        <View style={{ overFlow: "hidden" }}>
          <Text style={styles.text}>
            {data.name}
          </Text>
        </View>
        <Text style={styles.text}>
          ৳{(data.quantity * data.price).toFixed(2)}
          </Text>
        <View style={styles.action}>
          <TouchableOpacity onPress={onDecrease}>
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-remove-circle"
                  : "ios-remove-circle"
              }
              size={28}
              color={Colors.primary}
            />
          </TouchableOpacity>

          <Text style={styles.quantity}>{data.quantity} </Text>
          <TouchableOpacity onPress={onIncrease}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
              }
              size={28}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.touchable}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={28}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
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
  text: {
    paddingRight: 50,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    overflow: "hidden",
    width: "90%",
  },
  quantity: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 5,
    paddingHorizontal: 5,
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

export default CartItem;
