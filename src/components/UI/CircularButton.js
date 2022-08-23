import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';

const CircleButton = ({onPress, bg_color = '#FFF', img = require('../../../assets/ic_plus.png'), tint_color = 'grey', imgstyle}) => {
    return (
    <TouchableOpacity onPress={onPress}
        style={{
            height: 56,
            width: 56,
            backgroundColor: bg_color,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
       <Image style={[{width: 30, height: 30, tintColor: tint_color}, imgstyle]}
              source={img}/>
    </TouchableOpacity>

    );
}


export default CircleButton;