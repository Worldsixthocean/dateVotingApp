
import { View, Text, Pressable, ScrollView } from 'react-native';
import * as dateHelper from '../DataClass/dateHelper.js'
import WeekDayView from './WeekdayView.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimeRow from './TimeRow.js';

import { firebaseTimestampToDate,sameDateOrEariler } from '../DataClass/dateHelper.js';

export default function WeekView({date = new Date(), events = [], Duration = 15, onNextWeek = ()=>{}, onLastWeek = ()=>{}, setTimes = ()=>{}}){

    let DayOfWeek = date.getDay();
    startDate = dateHelper.daysBefore(date, DayOfWeek);
    let week = [];
    for(i = 0 ; i < 7; i++){
        week.push(dateHelper.daysAfter(startDate, i));
    } 

    console.log(week);
    console.log(events.filter((event)=>(
        sameDateOrEariler( week[0], firebaseTimestampToDate(event.date) ) && 
        sameDateOrEariler( firebaseTimestampToDate(event.date), week[6])
    )))

    return(
        <View style={{backgroundColor:'#ddd', height:300, borderRadius:20, padding:15}}>
            <View style={{flexDirection:'row',paddingBottom:13}}>
                <Pressable style={{marginTop:5}} onPress={onLastWeek}><Icon name="keyboard-arrow-left" size={23}/></Pressable>
                {week.map((d,i)=><WeekDayView date={d} key={i} style={{flex:1}}/>)}
                <Pressable style={{marginTop:5}} onPress={onNextWeek}><Icon name="keyboard-arrow-right" size={23}/></Pressable>
           </View>
           <ScrollView style={{flex:1}} nestedScrollEnabled={true}>
                <View style={{height:700, flexDirection:'row'}}>
                    <TimeRow style={{width:23}}></TimeRow>
                    <HorizontalLines/>{/* absolute */}
                </View>
           </ScrollView>
        </View>
)}

function HorizontalLines(){
    return(
        <View style={{position:'absolute',height:'100%', width:'100%',paddingHorizontal:30}}>
            {Array(24).fill(0).map((d,i)=>
                <View key={i} style={{flex:1, borderTopColor:'#777',borderTopWidth:1}}><Text></Text></View>
            )}
        </View>  
    )
}