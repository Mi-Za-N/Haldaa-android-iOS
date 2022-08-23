import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions
} from "react-native";
import Colors from "../../constants/Colors";

import DesignInput from "../../components/UI/DesignInput";
import Card from "../../components/UI/Card";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Draggable from 'react-native-draggable';
import Toast from "react-native-toast-message";
import {
  DragResizeBlock,
} from 'react-native-drag-resize';
import QuantityCounter from '../../components/app/QuantityCounter';


import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";

// import { AdMobRewarded } from 'expo-ads-admob';


const { width, height } = Dimensions.get('window');

const initialImageSize = 120;
const initialImageX = (170 - initialImageSize) / 2;
const initialImageY = (190 - initialImageSize) / 2;
console.log(initialImageSize)
 
const CustomDesignScreen = (props) => {

  const [isDragResizeDisabled, setIsDragResizeDisabled] = useState(false);
  const toggleDragResizeDisabled = useCallback(() => setIsDragResizeDisabled(disabled => !disabled), []);

  const [upperText, setUpperText ] = useState("");
  const [lowerText, setLowerText ] = useState("");
  const [picture,setPicture] = useState()
  const [image,setImage] = useState()
  const [ tshirtColor, setTshirtColor ] = useState("grey");
  const [ textColor, setTextColor ] = useState("black");
  const [min, setMin] = useState(14);
  const [max, setMax] = useState(14);
  const [borderRadius, setBorderRadius] = useState(5);



  
 const URL = `https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/`;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!result.cancelled) {
            setPicture(result.uri);
            // setImage(result.uri);
        }
    };

        const pickTshirt = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1
          });

          if (!result.cancelled) {
              setImage(result.uri);
              // setImage(result.uri);
          }
      };



props.navigation.setOptions({
     headerRight: () => (
      <View style={{
        paddingHorizontal:20,
        
      }}>
           <TouchableOpacity style={{
             backgroundColor:"#000000",
             padding:10,
             borderRadius:10
           }}
            onPress={pickTshirt}   >
             <Text style={{color: "white", fontWeight: "bold"}}>
               Upload Tshirt
             </Text>
          </TouchableOpacity>
        
        </View>
    ),
  });



  // //amdob ads setup start
  //   React.useEffect(() => {
  //   return function cleanup() {
  //     AdMobRewarded.removeAllListeners();
  //   };
  //   });

  //   let adUnitId = Platform.select({
  //     ios: "ca-app-pub-3940256099942544/1712485313",
  //     android: "ca-app-pub-7920549297971006/8309079712"
  //   });

  //   let loadAd = async () => {
  //     await AdMobRewarded.setAdUnitID(adUnitId);
  //     await AdMobRewarded.requestAdAsync();
  //   };

  //   AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", (reward) => {
  //     console.log(reward);
  //     loadAd();
  //   });

  //   AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
  //     loadAd();
  //   });

  //   AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
  //     loadAd();
  //   })

  //     React.useEffect(() => {
  //        loadAd();
  //       },[]);
   

  //      React.useEffect(() => {
  //       setTimeout(() => {
  //         AdMobRewarded.showAdAsync()
  //           }, 20000);
  //       },[]);
  // //amdob ads setup end

  // headerLeft: () => (
  //     <View style={{flex: 1,flexDirection: "row"}}>
      
  //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //       <Item
  //         title="Menu"
  //         iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
  //         onPress={() => {
  //           navData.navigation.toggleDrawer();
  //         }}
  //       />
  //     </HeaderButtons>
  //     </View>
  //   ),

    const lower_text_callback = () => {
        return (e) => {
            setMin(e);
            console.log('---->', e);
        };
    };
    const upper_text_callback = () => {
        return (e) => {
            setMax(e)
            console.log('---->', e);
        };
    };
    const border_radius_callback = () => {
        return (e) => {
            setBorderRadius(e)
            console.log('---->', e);
        };
    };


  return (
    <ScrollView>
      <View style={styles.imageContainer}>
            <Image 
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ? 
                image : `https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/${tshirtColor}`}}
            />
        {/* <Image style={styles.image} 
          source={{ uri: `https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/${tshirtColor}`}} 
        /> */}
      </View>
        <View style={styles.design}>
          <Draggable x={16} y={5}>
              <Text style={{color: textColor, fontWeight: "bold", 
              fontSize: max}}>{upperText}</Text>
          </Draggable> 
       <View style={styles.PickerimageContainer}> 
        <DragResizeBlock
          x={initialImageX}
          y={initialImageY}
          w={initialImageSize}
          h={initialImageSize}
          isDisabled={isDragResizeDisabled}
          onPress={toggleDragResizeDisabled}
        >
          <Image
            style={{
                width: "100%",
                height: "100%",
                borderRadius:borderRadius
            }}
            resizeMode={'cover'}
            source={{ uri: picture }}
          />
        </DragResizeBlock>
      </View> 
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Ionicons size={28} style={{ color: "white"}} name="md-camera"/>
          </TouchableOpacity>
          <Draggable x={8} y={160}>
             <Text  style={{color: textColor, fontWeight: "bold",fontSize:min}}>{lowerText}</Text>
          </Draggable> 
        </View>

      <Card>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        >
      <TouchableOpacity
       onPress={() => {
        setTshirtColor("black");
       }}
       style={styles.settingimageContainer}>
        <Image style={styles.settingImage} 
        source={{ uri: `${URL}black`}} 
        />
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => {
        setTshirtColor("white");
       }}
       style={styles.settingimageContainer}>
        <Image style={styles.settingImage} 
        source={{ uri: `${URL}white`}} 
        />
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => {
        setTshirtColor("red");
       }}
       style={styles.settingimageContainer}>
        <Image style={styles.settingImage} 
        source={{ uri: `${URL}red`}}  
        />
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => {
        setTshirtColor("grey");
       }}
       style={styles.settingimageContainer}>
        <Image style={styles.settingImage} 
        source={{ uri: `${URL}grey`}} 
        />
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => {
        setTshirtColor("blue");
       }}
       style={styles.settingimageContainer}>
        <Image style={styles.settingImage} 
        source={{ uri: `${URL}blue`}} 
        />
      </TouchableOpacity>
     </ScrollView>
     
      <DesignInput
        placeholder={"write upper text here"}
        name={"phone"}
        value={upperText}
        onChangeText={(text) => setUpperText(text)}
        />
        <View>              
        </View>
        <DesignInput
        placeholder={"write lower text here"}
        name={"phone"}
        value={lowerText}
        onChangeText={(text) => setLowerText(text)}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesListContainer} >
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("white") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>white</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("red") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>red</Text>
          </TouchableOpacity>
         <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("blue") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>blue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("black") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>black</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("orange") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>orange</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("green") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>green</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("blueviolet") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>blueviolet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("brown") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>brown</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("chocolate") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>chocolate</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("crimson") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>crimson</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("darkblue") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>darkblue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("darkgreen") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>darkgreen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("darkmagenta") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>darkmagenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("deeppink") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>deeppink</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("indigo") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>indigo</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("maroon") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>maroon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textColor}
            onPress={() => {setTextColor("yellow") }} >
             <Text style={{color: "white", fontWeight: "bold"}}>yellow</Text>
          </TouchableOpacity>
        </ScrollView>

             <View style={{flexDirection: 'row', paddingHorizontal:15}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text>Upper Text size</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <QuantityCounter onChange={upper_text_callback()} multiple={1} initialValue={14}/>

                  </View>
              </View>

              <View style={{flexDirection: 'row', paddingTop: 20,paddingHorizontal:15}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text>Lower Text size</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <QuantityCounter onChange={lower_text_callback()} multiple={1} initialValue={14}/>

                  </View>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 20,paddingHorizontal:15}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text>Make Image circular</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <QuantityCounter onChange={border_radius_callback()} multiple={1} initialValue={1}/>

                  </View>
            </View>
        </Card>
    </ScrollView>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "Design",
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "menu-unfold" : "menu-unfold"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 360,
  },
  image: {
    width: width,
    resizeMode:"cover",
    height: "100%",
  },
  design: {
    position: "absolute",
    top: 120,
    left: 110,
  },
  PickerimageContainer: {
    width: 135,
    height: 110,
    borderStyle: "solid",
    // borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "#E0E0E0",
    // elevation: 10
    },
   PickImage: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: -130,
        bottom: -99,
        backgroundColor: "#000000",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
  categoriesListContainer: {
    paddingVertical: 6,
    alignItems: 'center',
    paddingHorizontal: 6,
    
  },
   settingimageContainer: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingImage: {
    width: 60,
    height: 54,
  },
  textColor: {
    backgroundColor: Colors.primary,
     padding: 8,
     margin: 5,
     borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
     flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
});

export default CustomDesignScreen;