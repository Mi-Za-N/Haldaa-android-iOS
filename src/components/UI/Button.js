import React from 'react';
import {TouchableOpacity, Text, View, Image, Animated} from 'react-native';
import Surface from '../UI/Surface';

export function Button({type = 'default', children, btn_color = '#E7E7E7', text_color = '#000', borderColor = '#E7E7E7', onPress}) {
    if (type === 'default') {
        return (
            <TouchableOpacity onPress={onPress} style={{
                height: 40,
                backgroundColor: btn_color,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 11,
                borderRadius: 4,
            }}>
                <Text style={{color: text_color}}>{children}</Text>
            </TouchableOpacity>
        );
    } else if (type === 'shadow') {
        return (
            <Surface style={{borderRadius: 4}}>
                <TouchableOpacity onPress={onPress} style={{
                    height: 40,
                    backgroundColor: btn_color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 11,
                    borderRadius: 4,
                }}>
                    <Text style={{color: text_color}}>{children}</Text>
                </TouchableOpacity>
            </Surface>
        );
    } else if (type === 'outline') {
        return (
            <TouchableOpacity onPress={onPress} style={{
                height: 40,
                backgroundColor: btn_color,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 11,
                borderWidth: 1,
                borderColor: borderColor,
                borderRadius: 4,
            }}>
                <Text style={{color: text_color}}>{children}</Text>
            </TouchableOpacity>
        );
    } else if (type === 'flat') {
        return (
            <Surface>

                <TouchableOpacity onPress={onPress} style={{
                    height: 40,
                    backgroundColor: btn_color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 11,
                }}>
                    <Text style={{color: text_color}}>{children}</Text>
                </TouchableOpacity>
            </Surface>
        );
    }
}