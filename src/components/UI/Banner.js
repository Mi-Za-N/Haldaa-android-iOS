import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

const { width, height } = Dimensions.get('window');

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  //image size 700*220
  useEffect(() => {
    setBannerData([
    "https://res.cloudinary.com/dsop4plsb/image/upload/v1644713661/g7yvo5kllkdcbjpwzryu.jpg",
    "https://res.cloudinary.com/dsop4plsb/image/upload/v1644713575/n1ddkq238vzexosp6sh2.jpg",
    "https://res.cloudinary.com/dsop4plsb/image/upload/v1644713454/swnydgy2znlen5uzecex.jpg",
   "https://res.cloudinary.com/dsop4plsb/image/upload/v1644714462/icwczdduoknewjtty0pn.jpg",
    "https://res.cloudinary.com/dsop4plsb/image/upload/v1644715021/exqxggwff7avk0daakrb.jpg",
     "https://res.cloudinary.com/dsop4plsb/image/upload/v1645418653/sjcakzyfjbywziwnzosc.jpg",
    // "https://res.cloudinary.com/dsop4plsb/image/upload/v1627588299/mqosygcd1bke8tt6hsyf.jpg",
    // "https://res.cloudinary.com/dsop4plsb/image/upload/v1627588299/ypwxw9whwlhhbaf4es81.jpg",
    // "https://res.cloudinary.com/dsop4plsb/image/upload/v1627588298/rd9288hvgwuh7r9sbdfx.jpg",
    // "https://res.cloudinary.com/dsop4plsb/image/upload/v1627588298/isoubgr1tqvpdfdhkepd.jpg"
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView  horizontal>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            // style={{ height: height / 5.6 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={3}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    
  },
  swiper: {
    width: width,
    height: width / 2.2 ,
    alignItems: "center",
    marginTop: -33,
    marginBottom: -25
  },
  imageBanner: { 
    height: "100%",
    width: "100%" ,
    // borderRadius: 10,
    // marginRight: 20,
  },
});

export default Banner;
