import React from 'react';
import { View, Text, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const SingleCourse = (props) => {
    const course = props.route.params.item.lessons;
    const title = props.route.params.item.name;
    // console.log(title);

   const selectItemHandler = (item) => {
      props.navigation.navigate("Play Video", {
        item,
      });
    };


  props.navigation.setOptions({
    headerTitle: title,
  });


  return (
       <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        >
        {course.map((ls) => (
            <TouchableOpacity
              onPress={() => { 
              selectItemHandler(ls);
            }}
              key={ls._id}
              style={{
                   width:"100%",
                   height: 40,
                   paddingHorizontal: 10,
                   marginVertical:3,
                   borderBottomWidth: 1,
                   borderColor: '#D3D3D3',
                   backgroundColor: '#FAFAFA',
               }}>  
            <View style={{
                 flexDirection: 'row',
                 alignItems:"center",
                 paddingHorizontal: 10,
                 borderColor: '#D3D3D3',
                 backgroundColor: '#FAFAFA',
             }}>
              
                <Icon name="play-circle" color="red" size={24} />
               <Text style={{fontWeight:"bold"}} numberOfLines={1}>
                {ls.title}</Text>
             </View>
       </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesListContainer: {
    width:"100%",
    // paddingVertical: 6,
    // marginVertical:5,
    alignItems: 'center',
    
  },
});

export default SingleCourse;