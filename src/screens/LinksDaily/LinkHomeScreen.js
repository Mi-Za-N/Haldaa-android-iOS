import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Text,TouchableOpacity } from "react-native";
// import { AuthContext } from "../context/auth";
// import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../../contexts/link";
import axios from "axios";
import PreviewCard from "../../components/app/PreviewCard";
import SubmitButton from "../../components/app/SubmitButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";
import Search from  "../../components/UI/Search";
import {baseURL} from "../../../BaseUrl";
import Banner from "../../components/UI/Banner";
import TitleCard from "../../components/UI/TitleCard";

const LinkHomeScreen = ({ navigation }) => {
  // const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);
  const [page, setPage] = useState(1);
  const [linksCount, setLinksCount] = useState(0);
  const [keyword, setKeyword] = useState("");

  // console.log(links);

  useEffect(() => {
    fetchLinks();
  }, [page]);

  const fetchLinks = async () => {
    const { data } = await axios.get(`${baseURL}api/links/${page}`);
    setLinks([...links, ...data]);
  };

  useEffect(() => {
    const linksCount = async () => {
      const { data } = await axios.get(`${baseURL}api/links-count`);
      setLinksCount(data);
    };
    linksCount();
  }, []);

  const handlePress = async (link) => {
    await axios.put(`${baseURL}api/view-count/${link._id}`);
    navigation.navigate("LinkView", { link });


    // update link in the context
    setLinks(() => {
      const index = links.findIndex((l) => l._id === link._id);
      links[index] = { ...link, views: link.views + 1 };
      return [...links];
    });
  };

  navigation.setOptions({
    headerTitle: "Photo Contest",
       headerRight: () => (
      <View style={{
        paddingRight:20,
        
      }}>
           <TouchableOpacity style={{
             backgroundColor:"#000000",
             padding:10,
             borderRadius:10
           }}
            onPress={() => navigation.navigate("CreatePost")} 
              >
             <Text style={{color: "white", fontWeight: "bold"}}>
               Join Contest
             </Text>
          </TouchableOpacity>
        </View>
    ),
  });

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View  style={{justifyContent:"flex-start"}}>
        <TitleCard text='Sponsored by'/>
        <Banner />
        </View>
        
       <View style={{ justifyContent:"center",alignItems:"center" }}>
        <Text style={{ marginTop: 10, paddingBottom: 10}}>
          Recent Photo
        </Text>
        </View>

        <View showsVerticalScrollIndicator={false}>
          {links &&
            links.map((link) => (
              <View
                key={link._id}
                style={{
                  alignItems: "center",
                }}
              >
                <PreviewCard
                  handlePress={handlePress}
                  link={link}
                  showIcons={true}
                />
              </View>
            ))}

          {linksCount > links?.length && (
            <SubmitButton
              title="Load more"
              handleSubmit={() => setPage(page + 1)}
            />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Photo Contest",
    headerLeft: () => (
      <View style={{flex: 1,flexDirection: "row"}}>
      
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "menu-unfold" : "menu-unfold"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
      </View>
    ),
  };
};

export default LinkHomeScreen;



// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../../components/UI/HeaderButtons";

// const LinkHomeScreen = ({ }) => {
//   return (
//        <View style={styles.Container}>
//           <Text>this links home screen</Text>
//         </View>
//   );
// };


// export const screenOptions = (navData) => {
//   return {
//     headerTitle: "Links Daily",
//     headerLeft: () => (
//       <View style={{flex: 1,flexDirection: "row"}}>
      
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//       </View>
//     ),
//   };
// };



// const styles = StyleSheet.create({
//     Container: {
//      flex:1,
//      justifyContent:"center",
//      alignItems:"center"
//      },
// });

// export default LinkHomeScreen;