
import { View, Text, Button, Pressable } from 'react-native';
import * as dateHelper from '../DataClass/dateHelper.js'
import WeekDayView from './WeekdayView.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function WeekView({date = new Date(), events = [], Duration = 15, onNextWeek = ()=>{}, onLastWeek = ()=>{}}){

    let DayOfWeek = date.getDay();
    startDate = dateHelper.daysBefore(date, DayOfWeek);
    let week = [];
    for(i = 0 ; i < 7; i++){
        week.push(dateHelper.daysAfter(startDate, i));
    } 

    return(
        <View style={{backgroundColor:'#ddd', height:300, borderRadius:20, flexDirection:'row', padding:15}}>
            <Pressable style={{marginTop:5}} onPress={onLastWeek}><Icon name="keyboard-arrow-left" size={23}/></Pressable>
           {week.map((d,i)=><WeekDayView date={d} index={i} style={{flex:1}}/>)}
           <Pressable style={{marginTop:5}} onPress={onNextWeek}><Icon name="keyboard-arrow-right" size={23}/></Pressable>
        </View>
)}