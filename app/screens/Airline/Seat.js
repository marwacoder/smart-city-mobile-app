import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions , Image,ScrollView, SafeAreaView} from 'react-native'
import { Button, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {COLORS, SIZES, FONTS, icons, images} from '../../constants'

    const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F1F1F1',
        marginHorizontal: 20,
        marginVertical: 10
    },
    rowspacebetween: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignContent:'center',
    },
    header:{
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15
    },
    note:{
        marginVertical: 20
    },
    btn:{
        backgroundColor: COLORS.black,
        top: 0,
        left: 0,
        bottom: 0,
        padding: 15,
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 55,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginVertical: height /2
    },
    seat:{
        width: 60,
        height: 70,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        borderRadius: 10
    },
    seatTxt: {
        marginHorizontal: 18
    },
    seatWrapper:{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'   
    },
    background:{
        flex: 1,
        width: null,
        height: null
    },
    backgroundWrapper: {
        flex: 1,
        position: 'absolute',
        top: 70,
        left: 0,
        width: '100%',
        height: '100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: SIZES.h3
    },
    headerWrapper:{
        justifyContent:'space-between', 
        flexDirection: 'row',
        marginVertical: 15
    }
})



const SeatComponet =(props)=>{

    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const seatComponet = []



    const colorCodeHandler =(code,index)=>{
        setSelectedIndex(index),
        props.codeHandler(code)
    }
    React.useEffect(() => {
        props.codeHandler('A0')
      }, [])
    
    
    for(let i = 0; i< 12; i++){
        seatComponet.push(
        <Button  key={i} style={[styles.seat,{ backgroundColor: i === selectedIndex ?  COLORS.black : COLORS.white}]} onPress={()=>colorCodeHandler(`A${[i]}`,i)}>
        <Text color={selectedIndex === i ?  'white' : 'black'} >A{[i]}</Text>
        </Button>    
        )
    }
    
    return (
        <View >   
            <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20}}>
              <Text style={{...FONTS.h3, color: COLORS.grey}}>Business Class</Text>  
            </View>
            <View style={styles.seatWrapper}>
            {seatComponet}
        </View>
        
        </View>
        
        
    )
    
}

export default function Seat({route,navigation}) {
    const {selectedIndex}= route.params

    const [code, setCode] = React.useState('')
    
    const codeHandler =(code)=>{
        setCode(code)
    }
    
    console.log(route)

    return (
        <View style={styles.container}>
           <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <MaterialCommunityIcons  name='keyboard-backspace' 
            size={25} />
            
          </TouchableOpacity>
          <Text style={styles.title}>Choose a seat</Text>
          <View/>
            </View>
            <View style={[styles.rowspacebetween, styles.header]}>
                <View style={{flexDirection:'row'}}>
               {selectedIndex == 0 ? <SimpleLineIcons name='plane' size={25} />
               : <Image  source={icons.train} style={{width: 25, height: 25}}/>}
            <Text style={{marginHorizontal: 10}}>Boeing 757-200</Text>
                </View>
            
            <Ionicons style={{marginHorizontal: 50}} name='md-chevron-forward-sharp' />
            </View>
            <View style={styles.note}>
                <Text style={{fontSize: SIZES.h1, fontWeight: 'bold'}}>Seat: {code} - $512.00</Text>
                <Text style={{fontSize: SIZES.h4, color: COLORS.grey}}>The ticket price include transit, lunch, luggage upto 20kg * 5kg hand luggage wifi.</Text>
            </View>
            <SeatComponet codeHandler={codeHandler}/>
            <Button full style={styles.btn} onPress={()=> navigation.navigate('flightCheckout',{"selectedIndex": selectedIndex})}>
                   <View style={styles.rowspacebetween}>
                   <Text
              style={{fontSize: 20, fontWeight: 'bold',marginHorizontal: 50, color: COLORS.white}}>
              Continue
            </Text>
            <Text style={{color: COLORS.grey, fontSize: SIZES.h3, }}>$512</Text>
            <Ionicons color='white'  name='md-chevron-forward-sharp' size={25}/>
                   </View>
            
          </Button>
     
        </View>
    )
}
