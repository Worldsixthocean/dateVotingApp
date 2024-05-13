import * as React from 'react';
import { useState,useContext } from 'react';
import {View, Text,Switch} from 'react-native';
import {DrawerItemList } from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import { UserContext } from '../ContextAndConfig/UserContext';

import {userInList} from '../DataClass/event.js'
import TristateCheckBox from '../Component/tristate_checkBox.js';

//A list of propose date for ppl to vote
function DateRow( {date, index, times, setTimes} ) {

    const user = useContext(UserContext);
    const toggle = (e)=>{
        let array = Array.from(times);
        if(e == true){
            let newAvailable = times[index].available.concat([{uid: user.uid, name:user.user}]);
            array[index].available = newAvailable;

        }
        else{
            let newAvailable = times[index].available.slice(0,-1);
            array[index].available = newAvailable;
        }
        setTimes(array);
        
    }

    const value = userInList(times[index].available, user.uid)
    return (
        <>
            <View style={{flexDirection:'row', alignItems:'center', paddingVertical:8}}>
                <Text style={{paddingRight: 5}}>{date}</Text>
                <TristateCheckBox
                    style={{alignSelf:'flex-start'}} color='#0065FF'
                    onPress={()=>{toggle(!value)}} 
                    check={value}
                />
                <Text style={{paddingLeft: 10}}>No. of people: {times[index].available.length}</Text>
            </View>
            {times[index].available.map((attendees, index) => (
                <View style={[styles.outlineButton,{marginBottom:10}]} key={index}> 
                    
                    <Text style={{}}> 
                        {attendees.name || attendees.email}
                    </Text>

                </View>
            ))}
        </>
    );

}

export default DateRow;