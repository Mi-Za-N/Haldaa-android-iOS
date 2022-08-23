import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions
} from "react-native";
import { useCart } from '../../contexts/cart/use-cart';
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get('window');

const ProductItem = (props) => {
  // console.log("product item",props.discount)
  const count = props.count;
  const { addItem, removeItem, getItem, isInCart } = useCart();


  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComp useForeGround>
          <View>
            <View onPress={props.onSelect} style={styles.imageContainer}>
              <TouchableNativeFeedback onPress={props.onSelect}>
                <Image source={{ uri: props.image }} style={styles.image} />
              </TouchableNativeFeedback>
            </View>
            <View style={styles.details}>
              <Text numberOfLines={2} style={styles.title}>
                {props.title}
              </Text>
               <Text style={styles.brand}>{props.madeInCountry}</Text>
               <Text style={styles.discount}>{props.discount}%</Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.discounPrice}>{props.discounPrice}</Text>
              <Text style={styles.price}>৳{props.price}</Text>
              <Text style={styles.unit}>{props.unit}</Text>
              {!isInCart(props.id) ? (
               <>
               {count === 0 ? (
                <View >
                   <Image source={require('../../../assets/Stock-Out-1.png')} 
                   style={{width: 48, height: 14}} />
                 </View>
               ): (
                  <TouchableOpacity onPress={() => {
                     Toast.show({
                          topOffset: 60,
                          type: "success",
                          text1: `${props.title}`,
                          text2: " added in Cart",
                      })
                     addItem(props.product)}}>
                  <Ionicons
                      name={
                        Platform.OS === "android"
                          ? "md-cart"
                          : "md-cart"
                      }
                      size={29}
                      color={Colors.primary}
                    />
                </TouchableOpacity>
               )}
                
                </>
              ) : (
                <View style={styles.background}>
                    <TouchableOpacity onPress={() => { 
                      removeItem(props.product);
                     }}>
                    <Ionicons
                      name={Platform.OS === "android"
                          ? "md-remove-circle"
                          : "ios-remove-circle"}
                      size={28}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantity}> {getItem(props.id).quantity} </Text>
                  <TouchableOpacity onPress={() => {
                       addItem(props.product);
                     }}>
                    <Ionicons
                      name={
                        Platform.OS === "android"
                          ? "md-add-circle"
                          : "ios-add-circle"
                      }
                      size={28}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableComp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: height / 2.8 ,
    width: width / 2 -11,
    margin: 5,
  },
  touchable: {
    overflow: "hidden",
    // borderRadius: 10,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  title: {
    top: -6,
    fontSize: 12,
    marginBottom: 2,
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.primary,
     position: "relative",
    
  },
  discounPrice: {
    position: "absolute",
    top: 2,
    left: 6,
    fontSize: 12,
    color: "#ff0000",
    fontStyle: "italic",
    textDecorationLine: 'line-through',

  },
  brand: {
    top: -10,
    fontSize: 12,
    color: Colors.secondary
  },
  discount: {
    position: "absolute",
    right: 3,
    bottom: 145,
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 2,
    borderRadius: 20,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 8,
    paddingTop: 5
  },
  quantity: {
    color: Colors.white, 
    fontSize: 20,
    fontWeight: "bold",
    // paddingHorizontal: 0,
  },
  background: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingHorizontal: 3,
    borderRadius: 10,
  },
  unit: {
    fontSize: 10,
    color: Colors.secondary
  }
});

export default ProductItem;
