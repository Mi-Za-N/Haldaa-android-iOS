import React,{useContext} from 'react';
import { View, Text, StyleSheet,Dimensions,FlatList } from 'react-native';
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";

import ListItem from "./ListItem"

var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return(
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}>
             <Text style={{ fontWeight: 'bold'}}>Image</Text>
             </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold'}}>Title</Text>
            </View>
        </View>
    )
}

const TuitionScreen = (props) => {
    const context = useContext(AuthGlobal)
    const showTuitions = useAppState("tuitions");


  return (
   <View style={styles.container}>
      <FlatList 
        data={showTuitions}
        ListHeaderComponent={ListHeader}
        renderItem={({ item, index }) => (
            <ListItem 
                {...item}
                navigation={props.navigation}
                index={index}
                // delete={deletItem}
            />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
  headerItem: {
       paddingHorizontal:20,
        margin: 3,
        width: width / 3
    },
 container: {
    marginBottom: 160,
    backgroundColor: 'white'
 },
  headerItem: {
    paddingHorizontal:20,
    margin: 3,
    width: width / 3
  },
});

export default TuitionScreen;