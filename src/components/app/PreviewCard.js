import React, { useState, useContext,useEffect } from "react";
import { View, Image, TouchableOpacity,Text } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Text from "@kaloraat/react-native-text";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { LinkContext } from "../../contexts/link";
// import { AuthContext } from "../../context/auth";
import {baseURL} from "../../../BaseUrl";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import IconSet from "./IconSet";

const PreviewCard = ({
  handlePress = (f) => f,
  link,
  showIcons = false,
}) => {
  // context
  const [links, setLinks] = useContext(LinkContext);
  const context = useContext(AuthGlobal);
  // console.log(context.stateUser.isAuthenticated);
  




   const handleLikePress = async (link) => {
     if(!context.stateUser.isAuthenticated){
           Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please Sign up first to vote here",
             text2: "Great to see you here, Thanks",
          });
      }
    // console.log("link clicked", link._id);
    const { data } = await axios.put(`${baseURL}api/like`,
    { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      data.postedBy = context.stateUser.user;
      links[index] = data;
      return [...links];
    });
  };

  const handleUnLikePress = async (link) => {
     if(!context.stateUser.isAuthenticated){
           Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please Sign up first to vote here",
             text2: "Great to see you here, Thanks",
          });
      }
    // console.log("link clicked", link._id);
    const { data } = await axios.put(`${baseURL}api/unlike`,
    { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      data.postedBy = context.stateUser.user;
      links[index] = data;
      return [...links];
    });
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "92%",
        height: 330,
        borderRadius: 14,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
      }}
    >
      <Image
        style={{
          height: "70%",
          width: "100%",
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
        source={{ uri: link.image }}
      />

      <View style={showIcons ? { marginBottom: 0 } : {}}>
        <IconSet
          handleLikePress={handleLikePress}
          handleUnLikePress={handleUnLikePress}
          link={link}
          showIcons={showIcons}
          auth={context.stateUser}
        />
      </View>

      <TouchableOpacity 
      // onPress={() => handlePress(link)}
      >
        <View style={{ padding: 5, height: 90 }}>
          <Text  style={{ paddingBottom: 2 }}>
            {link.title}
          </Text>
          {/* <Text numberOfLines={1}>{link.camera}</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewCard;
