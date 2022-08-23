import React from 'react';
import { View,Text, StyleSheet,ScrollView, TouchableOpacity,Image } from 'react-native';
import Colors from "../../constants/Colors";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";

const DistricItem = ({subMenu }) => {
   const distric = useAppState("districs");
    const dispatch = useAppDispatch();
  // console.log(distric);
  const onCategoryClick = (id) => {
      dispatch({ type: 'RENT_FILTER', payload: id });
  };
  return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        >
        {distric.map((sm) => (
          <TouchableOpacity
            style={styles.gap}
            key={sm._id}
            activeOpacity={0.8}
            onPress={() => {
                onCategoryClick(sm._id);
             }}>
            <View
              style={{backgroundColor: "#006400",
                ...styles.categoryBtn}}>
                  {/* <Image source={{ uri: sm.image }} style={styles.image} /> */}
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
    );
}; 

const styles = StyleSheet.create({
  categoriesListContainer: {
    paddingVertical: 6,
    marginVertical:5,
    alignItems: 'center',
    paddingHorizontal: 1,
    
  },
  gap: {
    paddingLeft: 3
  },
  categoryBtn: {
    height: 35,
    width: "100%",
    borderRadius: 10,
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

export default DistricItem;