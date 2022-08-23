import React from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from '../../contexts/cart/use-cart';
import Toast from "react-native-toast-message";

const ProductDetailScreen = (props) => {
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const product= props.route.params.item;
  // console.log(product);
  const title= props.route.params.title;

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} 
        source={{ uri: product.image}} />
      </View>
      <View style={styles.details}>
        
        <Text style={styles.title}>{title}</Text>
        <View style={styles.des}>
         <Text style={styles.price}>Price: ৳{product.price}</Text>
         <Text style={styles.price}>Brand: {product.brand}</Text>
         <Text style={styles.price}>size: {product.unit}</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.madeView}>
            <Text style={{color: Colors.white}}>Made In Country:
            <Text style={styles.madeInCountry}> {product.madeInCountry}</Text> </Text>
        </View>
         <View style={styles.action}>
        {!isInCart(product.id) ? (
             <>
             {product.countInStock === 0 ? (
                <View >
                   <Image source={require('../../../assets/Stock-Out-1.png')} 
                   style={{width: 88, height: 24}} />
                 </View>
               ): (
                  <TouchableOpacity>
                  <Button
                    buttonStyle={{
                        backgroundColor: "white",
                        borderRadius: 60,
                        flex: 1,
                        height: 30,
                        width: 30,
                    }}
                    titleStyle={{
                      color: "white",
                      fontSize: 16,
                  }}
                    // disabled={quantity > 0}
                    color={Colors.secondary}
                    title="Add to Cart"
                    onPress={() => {
                       Toast.show({
                          topOffset: 60,
                          type: "success",
                          text1: `${title}`,
                          text2: " added in Cart",
                      })
                      addItem(product)
                    }}
                  />
                </TouchableOpacity>
               )}
                </>
              ) : (
                <View style={styles.background}>
                    <TouchableOpacity onPress={() => { 
                      removeItem(product);
                     }}>
                    <Ionicons
                      name={Platform.OS === "android"
                          ? "md-remove-circle"
                          : "ios-remove-circle"}
                      size={30}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantity}> {getItem(product.id).quantity} </Text>
                  <TouchableOpacity onPress={() => {
                       addItem(product);
                     }}>
                    <Ionicons
                      name={
                        Platform.OS === "android"
                          ? "md-add-circle"
                          : "ios-add-circle"
                      }
                      size={30}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              )}
          </View>
      </View>
    </ScrollView>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.title,
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  price: {
    fontSize: 14,
    color: Colors.accent,
    textAlign: "center",
    marginVertical: 20, 
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
    marginHorizontal: 10, 
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  action: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 15,
    paddingTop: 20 
  },
  quantity: {
    color: Colors.primary, 
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 1,
  },
  background: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 3,
    borderRadius: 10,
  },
  des: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    // paddingTop: 5
  },
  madeView:{
    alignItems: "center",
    justifyContent: "space-between",
  },
  madeInCountry: {
    fontSize: 18,
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold"
  },
});

export default ProductDetailScreen;
