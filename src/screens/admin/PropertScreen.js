import React, { useState, useCallback,useContext,useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button
} from "react-native";
import { Heading, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import ListItem from "./ListItem"

import axios from "axios"
import baseURL from "../../../BaseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EasyButton from "../../components/StyledComponents/EasyButton";

import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";

var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return(
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}>
             <Text style={{ fontWeight: 'bold'}}>Image</Text>
             </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold'}}>Title</Text>
            </View>
        </View>
    )
}

const PropertyScreen = (props) => {
     const context = useContext(AuthGlobal)
    const showEvents = useAppState("showSale");
    
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    // console.log(token);
   

    const searchProduct = (text) => {
        if (text == "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) => 
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

     const deletItem = (id) =>{
      // console.log(id);

   fetch(`${baseURL}api/events/delete/${id}`, {
        method: "DELETE",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) =>console.log(data))
        .catch((error) => {
        // setError(true)
      });
   }

   useEffect(() => {
     AsyncStorage.getItem("jwt")
      .then((res) => {
          setToken(res)
      })
      .catch((error) => console.log(error))
   },[]);

    // const deleteProduct = (id) => {
    //     axios
    //         .delete(`${baseURL}api/events/delete/${id}`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         })
    //         .then((res) =>  res.json())
    //         .catch((error) => console.log(error));
    // }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("adminTolet")}
            >
                <Icon name="home" size={18} color="white" />
                <Text style={styles.buttonText}>Tolet</Text>
            </EasyButton>
            <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate("adminTuition")}
            >
                <Icon name="book" size={18} color="white" />
                <Text style={styles.buttonText}>Tuition</Text>
            </EasyButton>
            <EasyButton
                secondary
                medium
                // onPress={() => props.navigation.navigate("Categories")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Categories</Text>
            </EasyButton>
        </View>

      {/* <View>
          <Heading searchBar rounded>
              <Item style={{ padding: 5 }}>
                  <Icon name="search" />
                  <Input 
                    placeholder="Search"
                    // onChangeText={(text) => searchProduct(text)}
                  />
              </Item>
          </Heading>
      </View> */}

    
          <FlatList 
            data={showEvents}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
                <ListItem 
                   key={index}
                    {...item}
                    navigation={props.navigation}
                    index={index}
                    delete={deletItem}
                />
            )}
            keyExtractor={(item) => item.id}
          />
      
    </View>
  );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
       paddingHorizontal:20,
        margin: 3,
        width: width / 3
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})

export default PropertyScreen;
