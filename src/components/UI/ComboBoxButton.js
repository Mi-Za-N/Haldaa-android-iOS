import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';


const dummyArr = [
    {
        title: 'HSC',
        value: 'HSC',
        checked: false,
    },
    {
        title: 'SSC',
        value: 'SSC',
        checked: false,
    },
    {
        title: 'Class 8',
        value: 'Class 8',
        checked: false,
    },
    {
        title: 'Class 7',
        value: 'Class 7',
        checked: false,
    },
    {
        title: 'Class 6',
        value: 'Class 6',
        checked: false,
    },
    {
        title: 'Class 5',
        value: 'Class 5',
        checked: false,
    },
    {
        title: 'Class 4',
        value: 'Class 4',
        checked: false,
    },
    {
        title: 'Class 3',
        value: 'Class 3',
        checked: false,
    },
    {
        title: 'Math',
        value: 'Math',
        checked: false,
    },
    {
        title: 'Physics',
        value: 'Physics',
        checked: false,
    },
    
    {
        title: 'Chemistry',
        value: 'Chemistry',
        checked: false,
    },
    {
        title: 'Biology',
        value: 'Biology',
        checked: false,
    },
    {
        title: 'English',
        value: 'English',
        checked: false,
    },
    
     {
        title: 'Higher Math',
        value: 'Higher Math',
        checked: false,
    },
    {
        title: 'Economics',
        value: 'Economics',
        checked: false,
    },
    {
        title: 'statistics',
        value: 'statistics',
        checked: false,
    },
    {
        title: 'ICT',
        value: 'ICT',
        checked: false,
    },
    {
        title: 'Accounting',
        value: 'Accounting',
        checked: false,
    },
     {
        title: 'Marketing',
        value: 'Marketing',
        checked: false,
    },
    {
        title: 'Finance',
        value: 'Finance',
        checked: false,
    },
    {
        title: 'Bangla',
        value: 'Bangla',
        checked: false,
    },
     
     {
        title: 'Arts Subjects',
        value: 'Arts Subjects',
        checked: false,
    },
    {
        title: 'Management',
        value: 'Management',
        checked: false,
    },
    
    {
        title: 'Geography',
        value: 'Geography',
        checked: false,
    },
    {
        title: 'Commerce Subjects',
        value: 'Commerce Subjects',
        checked: false,
    },
    {
        title: 'Science Subjects',
        value: 'Science Subjects',
        checked: false,
    },
];
  
const ComboBoxButton = ({data = dummyArr, callback, 
    checked_color = "#DD502C"    }) =>{

    const [dataArr, setDataArr] = useState(data);

    const onCheck = (item, idx) => {
        return () => {
            const arr = [...dataArr];
            arr[idx].checked = !arr[idx].checked;
            setDataArr(arr);
            const result = arr.filter(arr => arr.checked === true);
            // console.log('result----->', result);
            return callback(result);
        };
    };
    return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          dataArr.map((x, y) => {
             return (
                 <TouchableOpacity onPress={onCheck(x, y)} key={y}
                      style={{
                          height: 30,
                          backgroundColor: x.checked ? checked_color : '#f0f8ff',
                          paddingHorizontal: 8,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius:25,
                          marginBottom: 5,
                          marginRight: 5,
                          borderWidth: 1
                      }}>
                     <Text style={{color:x.checked ? '#f3f3f3' : '#000'}}>{x.title}</Text>

                 </TouchableOpacity>
             );
            })
        }

    </View>
    );
}
export default ComboBoxButton;