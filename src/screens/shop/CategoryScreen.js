import React,{useEffect, useState, } from 'react';
import {  View,Text, StyleSheet,ScrollView, TouchableOpacity,Image  } from 'react-native';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import Colors from "../../constants/Colors";
import { getCategorySubs } from "../../function/sub";
import SubCat from "./SubCat";


const CategoryScreen = (props) => {
  const dispatch = useAppDispatch();
    const categories = useAppState("sidebarData");

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [subId,setSubId] = useState("");

  const initialState = {
    category: "",
    subCategory: [],
    categories: [],
  };

    // console.log(categories);
    const onCategoryClick = (id) => {
      setSubId(id);
      dispatch({ type: 'SAME_TYPE_PRODUCT_INFO', payload: id });
  };



  useEffect(() => {
   setValues({ ...values, subCategory: [], category: subId });
    getCategorySubs(subId).then((res) => {
      // console.log("subs res",subOptions);
      setSubOptions(res.data);
    });
    setShowSub(true);
  }, [subId]);

  //  console.log("subs",subOptions.category);



  return (
    <>
       <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        >
          
        {categories.map((sm) => (
          <TouchableOpacity
            style={styles.gap}
            key={sm._id}
            activeOpacity={0.8}
            //  onPress={() => {
            //     dispatch({ type: 'SAME_TYPE_PRODUCT_INFO', payload: sm._id });
            //     // props.navigation.navigate("CatPod", {
            //     //   id: category._id,
            //     //   title: category.name,
            //     //   subMenu: category.subCategories
            //     // });
            //   }}
            onPress={() => {
                onCategoryClick(sm._id);
             }}
             >
            <View
              style={{backgroundColor: Colors.primary,
                ...styles.categoryBtn}}>
                  <Image source={{ uri: sm.image }} style={styles.image} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginHorizontal: 5,
                  color:Colors.white,
                }}>
                {sm.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {subOptions.category===null ? null : <SubCat subMenu={subOptions} />}
      
      </>
  );
};

const styles = StyleSheet.create({
    categoriesListContainer: {
    paddingVertical: 6,
    alignItems: 'center',
    paddingHorizontal: 1,
    
  },
  gap: {
    paddingLeft: 3
  },
  categoryBtn: {
    height: 30,
    width: "100%",
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 2,
    flexDirection: 'row',
    marginHorizontal: 3
  },
  image: {
   height: 28,
   width: 28, 
   resizeMode: 'cover',
   borderRadius: 35,
   backgroundColor: Colors.white,
   justifyContent: 'center',
   alignItems: 'center',
  },
  categoryBtnImgCon: {
    height: 30,
    width: 30,
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryScreen;