import 'react-native-gesture-handler'
import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet,Platform } from 'react-native';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";


import Main from "./src/Navigators/Main";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AuthProvider from "./src/contexts/auth/store/Auth";
import { AppProvider }  from "./src/contexts/app/app.provider";
import { CartProvider } from './src/contexts/cart/use-cart';
import { extendTheme, NativeBaseProvider } from 'native-base';
// import * as FacebookAds from 'expo-ads-facebook';
// import { AdMobRewarded } from 'expo-ads-admob';
import { LinkProvider } from "./src/contexts/link";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);



// Saving Keystore to /Users/mizan/Downloads/HaldaBD/Halda.jks
// Keystore credentials
//   Keystore password: ed921b1de3b244c48359eae4a6d6d3d7
//   Key alias:         QHJhaXNhMjAvSGFsZGE=
//   Key password:      4fd1a10ba17140db85b98352b42f69df

//   Path to Keystore:  /Users/mizan/Downloads/HaldaBD/Halda.jks







// watchman watch-del-all && rm -f yarn.lock && rm -rf node_modules && yarn && yarn start --reset-cache





    // "facebookScheme": "fb1234567891234567",
    // "facebookAppId": "653665352359258",
    // "facebookDisplayName": "Halda",
    // "facebookAutoLogAppEventsEnabled": true,
    // "facebookAdvertiserIDCollectionEnabled": true,
    // "plugins": [
    //   [
    //   "expo-ads-admob",
    //   {
    //     "userTrackingPermission": "This identifier will be used to deliver personalised ads to you."
    //   }
    //   ],
    //   [
    //     "expo-ads-facebook",
    //     {
    //       "userTrackingPermission": "This identifier will be used to deliver personalized ads to you."
    //     }
    //   ]
    // ]


const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};

const theme = extendTheme({ colors: newColorTheme });

const App = ({ }) => {
  const netInfo = useNetInfo();
  

         
             if(netInfo.type !=="unknown" && netInfo.isInternetReachable === false){
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "You're offline",
                    text2: "Check your internet connection",
                })
             }
  

  // // facebook ads setup start
  //     let [ isLoaded, setIsLoaded ] = React.useState(false);
  //     const bannerId = getPlacementId(true);
  //     const interstitialId = getPlacementId(false);

  //     FacebookAds.AdSettings.requestPermissionsAsync()
  //       .then(permissions => {
  //         let canTrack = permissions.status === "granted";
  //         FacebookAds.AdSettings.setAdvertiserTrackingEnabled(canTrack);
  //         setIsLoaded(true);
  //       })

  //     function getPlacementId(bannerAd) {
  //       let placementId;
  //       if (bannerAd) {
  //         placementId = Platform.OS === "ios" ? "653665352359258_653669002358893" : "653665352359258_653668062358987"
  //       } else {
  //         placementId = Platform.OS === "ios" ? "653665352359258_653669105692216" : "653665352359258_653668242358969"
  //       }

  //       if (__DEV__) {
  //         return `IMG_16_9_APP_INSTALL#${placementId}`;
  //       }

  //       return placementId;
  //     }

  //     function showInterstitial() {
  //       FacebookAds.InterstitialAdManager.showAd(interstitialId)
  //         .then(didClick => console.log(didClick))
  //         .catch(error => console.log(error));
  //     }

  //     function getBannerAd() {
  //       if (isLoaded) {
  //         return (
  //           <FacebookAds.BannerAd
  //             placementId={bannerId}
  //             type="large"
  //             onPress={() => console.log("click")}
  //             onError={error => console.log(error.nativeEvent)} />
  //         );
  //       }
  //     }



  //       useEffect(() => {
  //       setTimeout(() => {
  //             showInterstitial()
  //           }, 15000);
  //       },[]);
  //   // facebook ads setup end



  //   //admob ads setup start
  //   React.useEffect(() => {
  //   return function cleanup() {
  //     AdMobRewarded.removeAllListeners();
  //   };
  //   });

  //   let adUnitId = Platform.select({
  //     ios: "",
  //     android: ""
  //     // android: "ca-app-pub-3940256099942544/5224354917"
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
  //           }, 50000);
  //       },[]);
  // //amdob ads setup end



  return (
    <NativeBaseProvider theme={theme}>
    <AuthProvider>
      <AppProvider>
         <CartProvider>
         <LinkProvider>
      <NavigationContainer>
        <Main />
         <StatusBar style="auto" />
        <Toast />
      </NavigationContainer>
         </LinkProvider>
         </CartProvider>
      </AppProvider>
    </AuthProvider>
  </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
    Container: { 
      flex:1,
      justifyContent: "center",
      alignItems: "center"
    },
});

export default App;


