import React from 'react';
import { View,Text, StyleSheet,ScrollView, TouchableOpacity,Image } from 'react-native';
import Colors from "../../constants/Colors";

const CategoryProdScreen = ({ }) => {
   const CATEGORIES = [
  {
  "_id": "60997216cebaa615f1932854",
  "name": "Soccer",
  },
  {
  "_id": "609972f5cebaa615f1932858",
  "name": "surfing",

  },
  {
  "_id": "6099740b116c441892781e00",
  "name": "Rugby",

  }
]

  return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        >
        {CATEGORIES.map((sm) => (
          <TouchableOpacity
            style={styles.gap}
            key={sm._id}
            activeOpacity={0.8}
            onPress={() => {
                onCategoryClick(sm._id);
             }}>
            <View
              style={{backgroundColor: Colors.accent,
                ...styles.categoryBtn}}>
                  {/* <Image source={{ uri: sm.image }} style={styles.image} /> */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginHorizontal: 5,
                  color:Colors.black,
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
    alignItems: "stretch",
    paddingHorizontal: 1,
    
  },
  gap: {
    padding: 3
  },
  categoryBtn: {
    height: 30,
    width: "100%",
    marginRight: 7,
    borderRadius: 30,
    borderColor: "#ddd",
    borderWidth: 2,
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
    height: 20,
    width: 20,
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default CategoryProdScreen;


