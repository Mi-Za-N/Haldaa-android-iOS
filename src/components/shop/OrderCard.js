import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "../StyledComponents/TrafficLight";
import EasyButton from "../StyledComponents/EasyButton";
import OrderCartItem from "./OrderCartItem";
import Colors from "../../constants/Colors";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {baseURL} from "../../../BaseUrl";

const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();
  // console.log(order);

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == "Not Processed") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("Not Processed");
      setCardColor("#E74C3C");
    } else if (props.status == "processing") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("processing");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("Completed");
      setCardColor("#2ECC71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          // Toast.show({
          //   topOffset: 60,
          //   type: "success",
          //   text1: "Order Edited",
          //   text2: "",
          // });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        // Toast.show({
        //   topOffset: 60,
        //   type: "error",
        //   text1: "Something went wrong",
        //   text2: "Please try again",
        // });
      });
  };


  return (
    <View>
      <View style={[{ backgroundColor: cardColor }, styles.container]}>
        <View style={styles.TotalPricecontainer}>
        <Text style={styles.total}>Total Price: {props.totalPrice + 40}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Phone: {props.phone}
        </Text>
        <Text>
          Address: {props.shippingAddress1}, {props.shippingAddress2}
        </Text>
        <Text>City: {props.city}</Text>
        <Text>Delivery Fee: 40.00</Text>
        <Text>Date Ordered: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
        <Button
          color={Colors.primary}
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
        </View>
      </View>
    </View>
       {showDetails && (
        <View style={styles.detailItem}>
            <OrderCartItem
                order={props.orderItems}
             />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  total: {
     color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
   detailItem: {
    width: "100%",
  },
  TotalPricecontainer: {
    alignItems: "center",

  }

});

export default OrderCard;
