import React,{useMemo} from 'react';
import {
  StatusBar
} from 'react-native';
import Swipe from 'react-native-swiper';
import {Box} from 'native-base'

import ScreenOne from './ScreenOne'
import ScreenTwo from './ScreenTwo'
import ScreenThree from './ScreenThree'

import { useSelector} from 'react-redux'

// theme
const OnBoarding = ({navigation}) => {

  const {  isLoggedIn} = useSelector(state => state.auth || {})

  React.useEffect(()=>{

    // if(isLoggedIn) return navigation.navigate('Home')
      
  },[])
  const Board = useMemo(()=> (

    
    <Swipe loop={false} activeDotColor='#eab308'>
       <ScreenOne navigation={navigation} />
       <ScreenTwo navigation={navigation} />
       <ScreenThree navigation={navigation}/>
     </Swipe>
  ))

  return (
    <Box flex={1}>
     <StatusBar backgroundColor='black'/>
     {Board}
    </Box>
  );
};


export default OnBoarding;
