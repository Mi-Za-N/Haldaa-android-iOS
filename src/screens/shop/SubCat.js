import React from 'react';
import { View,Text, StyleSheet,ScrollView, TouchableOpacity,Image } from 'react-native';
import Colors from "../../constants/Colors";
import { useAppDispatch } from "../../contexts/app/app.provider";

const SubCatScreen = ({subMenu }) => {
  const dispatch = useAppDispatch(); 
  const onCategoryClick = (id) => {
      dispatch({ type: 'SUBTYPE_PRODUCT_INFO', payload: id });
  };
  return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        >
        { subMenu.map((sm) => (
          <TouchableOpacity
            style={styles.gap}
            key={sm._id}
            activeOpacity={0.8}
            onPress={() => {
                onCategoryClick(sm._id);
             }}>
            <View
              style={{backgroundColor: Colors.secondary,
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

export default SubCatScreen;