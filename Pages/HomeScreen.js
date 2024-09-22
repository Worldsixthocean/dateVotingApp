import * as React from 'react';
import { useContext, useState } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { signOut } from 'firebase/auth';

import { auth, storage } from '../ContextAndConfig/firebaseConfig.js';
import { UserContext } from '../ContextAndConfig/UserContext.js';
import PendingBox from '../Component/PendingBox.js'
import importStyle from '../style.js';

import { getDownloadURL,ref } from 'firebase/storage';
import TristateCheckBox from '../Component/tristate_checkBox.js';
import WeekView from '../Component/WeekView.js';

function HomeScreen({ navigation }) {

  const [imgState, setimgState] = useState();
  
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

  React.useEffect(() => {
    const func = async() => {
      const imgReference = ref(storage, 'Coffee.png');
      await getDownloadURL(imgReference).then((x)=>{
        setimgState(x);
      });
    }
    
    if (imgState == undefined){
      func();
    }

  },[]);

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
          <View style={{height:250, width:'100%', marginTop:50}}>
            <ScrollView scrollEnabled={false}>
              <Image style={{height:300, width:'100%'}}source={{uri:imgState}}/>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;