import React,{ useState, useEffect,useContext} from 'react';
import { View, FlatList, StyleSheet,Text,ActivityIndicator,ScrollView } from 'react-native';
import CommunityItem from "../../components/app/CommunityItem";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputWithIcon from "../../components/app/InputWithIcon";
import CircleButton from "../../components/UI/CircularButton";
import  Colors  from '../../constants/Colors';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import EasyButton from "../../components/StyledComponents/EasyButton";
import DistricItem from "../../screens/Distric/TutorDistric";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";
import Banner from "../../components/UI/Banner";
import TitleCard from "../../components/UI/TitleCard";

const TuitionScreen = (props) => {
  const context = useContext(AuthGlobal)
  const showTutors = useAppState("showTutors");
  const dispatch = useAppDispatch();

  const selectItemHandler = (item) => {
    props.navigation.navigate("TutorDetail", {
      item,
    });
  };

  const handleSubmit =  () => {
    props.navigation.navigate("TopBarTutor");
  };

  const handleTutorReq =  () => {
    props.navigation.navigate("TutorReq");
  };

  let myVar = 0;
  const handleOnChange = (text) => {
    if (myVar) clearTimeout(myVar);
     myVar = setTimeout(function(){ dispatch({ type: 'SET_SEARCH_TUTORS', payload: text }); }, 500);
    
  };


  props.navigation.setOptions({
    headerTitle: "Tutors",
    headerRight: () => (
         <View style={{flexDirection: "row",paddingHorizontal:10}}>
            <InputWithIcon 
            text_color={"#000"} 
            placeholderTextColor={'#000'} bg_color={"#f8f8ff"} 
            // value={value}
            // onChange={text => setValue(text)}
            onChange={text => handleOnChange(text)}
            />
            <View style={{backgroundColor: "#f8f8ff", justifyContent: "center", paddingHorizontal: 5, marginHorizontal: 5}}>
             <Icon name="search" color="black" size={26} />
            </View>
        </View>
    ),
  });

    const onMale  = () => {
        dispatch({ type: 'MALE_FILTER', payload: false });
    };
   const onFemale = () => {
        dispatch({ type: 'FEMALE_FILTER', payload: true });
    };


  return (
      <View style={{flex:1,}}>
       <View style={styles.Container}>
         <TitleCard text='Sponsored by'/>
          <Banner />
        <View style={styles.buttonRow}>
          <EasyButton
            small
            primary
            onPress={onMale}               
            >
                <Text style={styles.buttonText}>Male Tutors</Text>
          </EasyButton>
          <EasyButton
            small
            secondary
            onPress={onFemale}          
            >
                <Text style={styles.buttonText}>Female Tutors</Text>
          </EasyButton>
          <EasyButton
            small
            danger
            onPress={handleTutorReq}          
            >
                <Text style={styles.buttonText}>Req Tutor</Text>
          </EasyButton>
          </View>
           <DistricItem />
         {/* <View style={{flexDirection: "row"}}>
            <InputWithIcon 
            text_color={"#000"} 
            placeholderTextColor={'#000'} bg_color={"#f8f8ff"} 
            // value={value}
            // onChange={text => setValue(text)}
            onChange={text => handleOnChange(text)}
            />
            <View style={{backgroundColor: "#f8f8ff", justifyContent: "center", paddingHorizontal: 5, marginHorizontal: 5}}>
             <Icon name="search" color="black" size={26} />
            </View>
        </View> */}

        {/* {showTutors &&
            showTutors.map((data) => (
              <View
                key={data.id}
                style={{
                  alignItems: "center",
                }}
              >
                <CommunityItem
                  data={data}
                  onSelect={() => { 
                    selectItemHandler(data);
                  }}
                />
              </View>
            ))} */}

          <FlatList
              data={showTutors}
              keyExtractor={(item) => item._id}
              renderItem={(itemData) => (
                <CommunityItem
                  key={itemData.item.id}
                  data={itemData.item}
                  onSelect={() => { 
                    selectItemHandler(itemData.item);
                  }}
                 />
                  )}
                />
            {context.stateUser.isAuthenticated && (
              <View style={{
                  flex: 1, 
                  alignItems: 'center', 
                  position: 'absolute',
                  bottom: 5,
                  right: 5
                  }}>
                    <CircleButton imgstyle={{width: 20, height: 20}} 
                    img={require('../../../assets/ic_plus.png')}
                    onPress={handleSubmit}  
                    tint_color={'#FFF'} bg_color={Colors.secondary}/>
                </View>
            )}
        </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Halda",
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
    Container: { 
      flex:1,
      backgroundColor: "white",
      // justifyContent: "center",
      // alignItems: "center"
    },
      ButtonContainer: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",

  },
  buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16
    },
    buttonRow: {
    paddingVertical:2,
    paddingHorizontal: 8,
    justifyContent:"center",
    flexDirection: "row",
    alignItems: "center",
    // width: "95%"
    },
});

export default TuitionScreen;




// import React, { useEffect } from 'react'
// import {
//     FlatList,
//     Animated,
//     Dimensions,
//     Platform,
//     View,
//     Text
// } from 'react-native';

// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const { width, height } = Dimensions.get('window');
// const SPACING = 10; 
// const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.75 : width * 0.74;
// const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;


// const Carousel = () => {
//     const [data, setData] = React.useState([]);
//     const scrollX = React.useRef(new Animated.Value(0)).current;
//     useEffect(() => {
//         setData([{ key: 'empty-left' }, ...arr, { key: 'empty-right' }]);
//     }, [])

//     return (
//         <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
//         <Animated.ScrollView
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={16}
//             contentContainerStyle={{ alignItems: 'center'}}
//             snapToInterval={ITEM_SIZE}
//             horizontal
//             bounces={false}
//             pagingEnabled
//             decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
//             renderToHardwareTextureAndroid
//             snapToAlignment='start'
//             onScroll={Animated.event(
//                 [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                 { useNativeDriver: true }
//             )}
//         >
//             {
//                 data.map((item, index)=> {
//                     if (item?.key == 'empty-left' || item?.key == 'empty-right') {
//                         return <View style={{ width: EMPTY_ITEM_SIZE }} key={index.toString()}/>;
//                     }

//                     const inputRange = [
//                         (index - 3) * ITEM_SIZE,
//                         (index - 2) * ITEM_SIZE,
//                         (index - 1) * ITEM_SIZE,
//                         index * ITEM_SIZE,
//                         (index + 1) * ITEM_SIZE,
//                     ];
//                     const inputRangeN = [
//                         (index - 3) * ITEM_SIZE,
//                         (index - 2) * ITEM_SIZE,
//                         (index - 1) * ITEM_SIZE,
//                         index * ITEM_SIZE,
//                         (index + 1) * ITEM_SIZE,
//                     ];
//                     const translateY = scrollX.interpolate({
//                         inputRange,
//                         outputRange: [0,25, 50, 25, 0],
//                         extrapolate: 'clamp',
//                     });
                  
//                     const translateX = scrollX.interpolate({
//                         inputRange: inputRangeN,
//                         outputRange: [-350,-90, 0, 90, 350],
//                         extrapolate: 'clamp',
//                     });
//                     const inputRangeZindex = [
//                         (index - 3) * ITEM_SIZE,
//                         (index - 2) * ITEM_SIZE,
//                         (index - 1) * ITEM_SIZE,
//                         index * ITEM_SIZE,
//                         (index + 1) * ITEM_SIZE,
//                     ];
//                     const elevation = scrollX.interpolate({
//                         inputRange:inputRangeZindex,
//                         outputRange: [3, 5, 10, 5,3],
//                         extrapolate: 'clamp',
//                     });
//                     const style = Platform.select({ 
//                         ios: { zIndex: elevation},
//                         android: { elevation: elevation}
//                     })
//                     return (
//                         <Animated.View 
//                             style={[{ 
//                                 width: ITEM_SIZE, 
//                                 // zIndex: index == 0 ? 999 :1,
//                                 // // backgroundColor: 'red'
//                                 transform: [{ translateX, translateY, }],
//                             },style]} 
//                             key={index.toString()} 
                            
//                         >
//                             <Animated.View
//                                 style={{
//                                     marginHorizontal: SPACING,
//                                     padding: SPACING * 2,
//                                     height: 470,
//                                     backgroundColor: '#FAFAFA',
//                                     borderRadius: 30,
//                                     borderWidth: 2,
//                                 }}
//                             >
//                              <Text>{index}</Text>   
//                             </Animated.View>
//                         </Animated.View>
//                     );
//                 })
//             }
//         </Animated.ScrollView>
//         </View>
//     )
// }

// export default Carousel
