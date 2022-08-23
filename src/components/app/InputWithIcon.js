import React from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';


 const InputWithIcon = ({onPress, 
  // icon = require('../../assets/icon/ic_search_gray.png'),
   onChange, value, bg_color = '#000',border_color, placeholderTextColor = '#FFF', onFocus, onBlur, placeholder = 'Search by location', tintColor = '#000', opacity = .54, text_color="#FFF"}) => {
    return (
        <View style={{flexDirection: 'row', backgroundColor: bg_color, borderRadius: 2, width: "88%"}}>
            <TouchableOpacity onPress={onPress}
                              style={{width: 30, marginLeft: 5, alignItems: 'center', justifyContent: 'center'}}>
                {/* <Image source={icon}
                       style={{width: 24, height: 24, tintColor: tintColor, opacity: opacity}}/> */}
                       
            </TouchableOpacity>
            <View style={{flex: 1}}>
                <TextInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    style={{height: 35, color: text_color ,borderWidth: border_color}}
                    onChangeText={onChange}
                    value={value}
                />
            </View>
        </View>
    );
};


export default InputWithIcon;