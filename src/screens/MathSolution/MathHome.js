import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";

const screenWidth = Dimensions.get('window').width;


const PdfData = [
    {id: '1',
     title: 'Class 5',
     link: 'https://res.cloudinary.com/dgb4lc120/image/upload/v1652895033/Class_5_math_solution_oyt2ez.pdf',
    },
    {id: '2', 
    title: 'Class 6', 
    link: 'https://res.cloudinary.com/dgb4lc120/image/upload/v1652955386/Class_6_math_solution_lhaqwz.pdf', 
    },
    {id: '3', 
    title: 'Class 7', 
    link: 'https://res.cloudinary.com/dgb4lc120/image/upload/v1652955451/Class_7_Math_Solution_uzeoi0.pdf', 
    },
    {id: '4', 
    title: 'Class 8', 
    link: 'https://res.cloudinary.com/dgb4lc120/image/upload/v1652961530/Class_8_math_solution__compressed_nwhgzq.pdf', 
    },
    {id: '5', 
    title: 'Class 9-10', 
    link: 'https://res.cloudinary.com/dgb4lc120/image/upload/v1652960943/Class_910_math_solution_-compressed_wbeh5y.pdf', 
    },
    
];

const MathHome = (props) => {


    const selectItemHandler = (item) => {
      props.navigation.navigate("Math Solution PDF", {
        item,
      });
    };


  return (
      <>
      {PdfData.map((data)=><TouchableOpacity key={data.id}
      onPress={() => { 
              selectItemHandler(data.link);
            }}>
    <View style={{
            height: 70,
            width: screenWidth - 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
            marginHorizontal: 10,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            borderRadius: 5,
            elevation: 3,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 15
        }}>
            
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 16,
                     fontWeight: 'bold', 
                     color: '#272b43'}}>
                    {data.title}</Text>
            </View>
            <Text style={{fontSize: 16,
                 fontWeight: 'bold', 
                 color: '#dc2929'}}>
                View PDF</Text>
        </View> 
      </TouchableOpacity>)}
      </>
  );
};


export const screenOptions = (navData) => {
  return {
    headerTitle: "Math Solution",

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

const styles = StyleSheet.create({
    Container: { },
});

export default MathHome;