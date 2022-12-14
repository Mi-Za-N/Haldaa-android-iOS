import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import OrderCartItem from "./OrderCartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem = (props) => {
//   const [order, setOrder] = useState([]);
//   const [showDetails, setShowDetails] = useState(false);

//   useEffect(() => {
// let url = 'https://www.ifamilymart.com.bd/api/getMyOrderDetails/' + props.items.ref_no;
//     fetch(url)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         setOrder(responseJson.orderDetails);
//       })
//       .catch((error) => {
//         alert('Internal problem, Please try again laiter.')
//       });
//   },[]);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>৳ {props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />

        <TouchableOpacity onPress={props.onDelete}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={35}
            color="red"
            style={styles.deleteButton}
          />
        </TouchableOpacity>
      </View>

      {showDetails && (
        <View style={styles.detailItem}>
            <OrderCartItem
            order={order} />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItem: {
    width: "100%",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  deleteButton: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default OrderItem;
