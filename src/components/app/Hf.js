import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ComboBoxButton from "../UI/ComboBoxButton";

const Hf = ({ }) => {
      const callback_combo_box = () => {
        return (e) => {
            console.log(e)
        };
    };
    
  return (
       <View style={{paddingVertical: 2, paddingHorizontal: 18}}>
          <ComboBoxButton checked_color={"#DD502C"} 
          callback={callback_combo_box()}
          />
      </View>
  );
};

const styles = StyleSheet.create({
    Container: { },
});

export default Hf;
