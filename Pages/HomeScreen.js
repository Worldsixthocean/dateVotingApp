import * as React from 'react';
import { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { signOut } from 'firebase/auth';

import { auth } from '../ContextAndConfig/firebaseConfig.js';
import { UserContext } from '../ContextAndConfig/UserContext.js';
import PendingBox from '../Component/PendingBox.js'
import importStyle from '../style.js';
import TristateCheckBox from '../Component/tristate_checkBox.js';
import WeekView from '../Component/WeekView.js';
import * as dateHelper from '../DataClass/dateHelper.js'

function HomeScreen({ navigation }) {

  const [tickState, setTickState] = useState(0);
  const [shownDate, setShownDate] = useState(new Date());
  
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const user = useContext(UserContext);

  let cardContent;
  if(user && user?.pending && user?.pending?.length != 0){
    cardContent = <PendingBox eventID={user.pending.at(-1).eventID} invite={user.pending.at(-1).invite} bounded={true}/>;
  }
  else{
    cardContent = <></>
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerStyle: {backgroundColor:'transparent'},
      headerBackVisible: false
    });
  });

  return (
    <View>
      <View id="full_screen" style={{height:'100%', width:'100%'}}>
        <View id="top_area" style={{
            paddingTop: headerHeight + 3,
            paddingBottom: 18,
            paddingLeft: insets.left + 18,
            paddingRight: insets.right + 18,
            backgroundColor:"#ddd",
            height:"40%"
        }}>

          <View id="top_card" style={[importStyle.card, {flex:1, justifyContent:'center'}]}>
              {cardContent}
          </View>

        </View>
        <View id="bottom_area" style={{
            paddingTop: 18,
            paddingBottom: 0,
            paddingLeft: insets.left + 18,
            paddingRight: insets.right+ 18
        }}>
            <Button title={'Sign Out ' + (user ? user.user:'')}
              onPress={()=>{
                try{
                  signOut(auth);
                }
                catch(err){
                  console.log(err.message);
                }
            }}/>
            <TristateCheckBox size={25} style={{marginTop:20}} color='#0065FF'
              onPress={()=>{setTickState(tickState == 0 ? 1 : 0)}}
              onLongPress={()=>{setTickState(2)}}
              check={tickState == 1} indeterminate={tickState == 2}/>

            <WeekView date={shownDate} 
              onNextWeek={()=>{setShownDate(dateHelper.daysAfter(shownDate,7))}}
              onLastWeek={()=>{setShownDate(dateHelper.daysBefore(shownDate,7))}}
              />
            
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;