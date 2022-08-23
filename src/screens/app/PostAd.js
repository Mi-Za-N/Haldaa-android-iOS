
import React from 'react';
import { View, TouchableOpacity,ImageBackground, StyleSheet,Text ,Dimensions} from 'react-native';
import Card from '../../components/UI/Card';

const screenWidth = Dimensions.get('window').width;

const PostAd = ({ }) => {
 const URL =`https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29sb3IlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80`
 const URL2 =`https://t4.ftcdn.net/jpg/01/97/92/77/360_F_197927767_MISwwnukYrfEH7BoyWazNXLS2p32Plcb.jpg`
  return (
       <View style={{
         flex: 1, 
         marginTop:50,
          alignItems:"center"}}>
           <Text style={{
              fontSize: 16,
              marginVertical: 20,
              color: '#000000',
          }}>Choose a Ad package for you</Text>
        <ImageBackground source={{uri: URL}}
              style={{
                  width: screenWidth,
                  height: 190,
                  // justifyContent: "center",
                  marginBottom: 30 
              }}>
            <View style={{alignItems:"center",}}>
             <TouchableOpacity style={styles.textColor}
               // onPress={() => {setTextColor("white") }}
             >
            <Text style={{color: "black", fontWeight: "bold",}}>BASIC</Text>
          </TouchableOpacity>
           </View>
          <Text style={styles.content}>1.Ads for tuition</Text>
          <Text style={styles.content}>2.Ads for Roommate wanted</Text>
          <Text style={styles.content}>3.Ads for property</Text>
            <View style={{alignItems:"flex-end",}}>
             <TouchableOpacity style={styles.choose}
               // onPress={() => {setTextColor("white") }}
             >
            <Text style={{color: "white", fontWeight: "bold",}}>Choose</Text>
          </TouchableOpacity>
           </View>
        </ImageBackground>

         <ImageBackground source={{uri: URL2}}
              style={{
                  width: screenWidth,
                  height: 190,
                  // justifyContent: "center",
                  // paddingTop: 110 
              }}>
            <View style={{alignItems:"center",}}>
             <TouchableOpacity style={styles.premium}
               // onPress={() => {setTextColor("white") }}
             >
            <Text style={{color: "black", fontWeight: "bold",}}>PREMIUM</Text>
          </TouchableOpacity>
           </View>
          <Text style={styles.content}>1.Ads for tuition</Text>
          <Text style={styles.content}>2.Ads for Roommate wanted</Text>
          <Text style={styles.content}>3.Ads for property</Text>
          <Text style={styles.content}>4.upload video for property</Text>
            <View style={{alignItems:"flex-end",}}>
             <TouchableOpacity style={styles.choose}
               // onPress={() => {setTextColor("white") }}
             >
            <Text style={{color: "white", fontWeight: "bold",}}>Choose</Text>
          </TouchableOpacity>
           </View>
        </ImageBackground>
       </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "MilleniVision",
  };
};


const styles = StyleSheet.create({
     Container: { 
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    row: {
    paddingVertical:10,
    flexDirection: "row",
    width: "95%"
  },
  inputWrap: {
    flex: 1,
    borderColor: "#000",
    // borderBottomWidth: 1,
    // marginBottom: 10
  },
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  label: {
    width: "80%",
    marginTop: 10,
    paddingHorizontal: 5
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
    paddingVertical:10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    // width: "95%"
    },
    desContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderEndColor: "#000",
      // borderBottomWidth: 2
      marginHorizontal: 10
    },
    content:{
        fontSize: 14,
        color: 'white',
        fontWeight:"bold",
        paddingLeft: 10,
    },
    textColor: {
    width:60,
    backgroundColor: "white",
     padding: 8,
     margin: 5,
     borderRadius: 10,
  },
  premium: {
    width:90,
    backgroundColor: "white",
     padding: 8,
     margin: 5,
     borderRadius: 10,
  },
  choose:{
    width:70,
    backgroundColor: "black",
     padding: 10,
     marginRight:10,
     marginTop: 15,
     borderRadius: 10,
  },
});

export default PostAd;







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