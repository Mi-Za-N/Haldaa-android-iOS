import React,{useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet,Dimensions,Platform } from 'react-native';


import Card from "../../components/UI/Card";
import { Video } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

const PlayVideo = (props) => {
     const [show, setShow] = useState(false);
     const PlayVideo = props.route.params.item.video.Location;
     const title = props.route.params.item.title;
    //  console.log("item",props.route.params.item.title);
     const video = React.useRef(null);
     const [status, setStatus] = React.useState({});

  useEffect(()=>{ 
    setTimeout(() => {
       setShow(true)
     },5000);
  },[]);



  return (
       <View style={styles.Container}>
        <Card>
          <View style={{padding:8,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontWeight:"700"}}>{title}</Text>
          </View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: PlayVideo,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause Video' : 'Play Video'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
         </View>
      </Card>
      {show===false && (
      <Card>
        <View style={{
          width: screenWidth - 10,
          backgroundColor:"#f08080",
          height:30,
          justifyContent:"center",
          alignItems:"center",
          borderRadius:5
        }}>
          <Text style={{color:"white",fontWeight:"700"}}>
            Don't play video? pleases wait... or check your internet</Text>
        </View>
      </Card>
      )}
     </View>
  );
};

const styles = StyleSheet.create({
    Container: {
     flex:1,
     marginTop:15,
     // justifyContent:"center",
     alignItems:"center"
    },
  video: {
    alignSelf: 'center',
    width: screenWidth,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:20
  },
});

export default PlayVideo;