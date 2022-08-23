import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={AntDesign}
      iconSize={25}
      color={Platform.OS === "android" ? "#ffffff" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
