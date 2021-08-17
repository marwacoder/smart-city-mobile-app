import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native'


import {COLORS, SIZES, FONTS, icons, images} from '../../constants'


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F1F1F1',
        marginHorizontal: 20,
        marginVertical: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: SIZES.h3
    },
    headerWrapper:{
        justifyContent:'space-between', 
        flexDirection: 'row',
        marginVertical: 15
    },
    rowspacebetween: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignContent:'center',
    },
    iconWrapper:{
        width: 15,
        height: 15,
        borderRadius: 15,
        borderWidth: 3, 
        borderColor: COLORS.black,
        backgroundColor: COLORS.white,
        marginVertical: 10
    },
    dot: {
        fontSize: 30, 
        color: COLORS.grey, 
        marginTop: -10,
    },
    info1:{
        borderRadius: 15,
        backgroundColor: COLORS.white
    }
})

export default function CheckoutInfo({route,navigation}) {

    const {selectedIndex} = route.params
    return (
        <View style={styles.container}>
           <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <icons.MaterialCommunityIcons  name='keyboard-backspace'
            size={25} />
            
          </TouchableOpacity>
          <Text style={styles.title}>{selectedIndex == 0 ? 'Flight' : 'Train'}: SU 2578</Text>
          <icons.AntDesign name='upload' type='' size={25}/>
            </View>
            <View style={[styles.rowspacebetween, {marginVertical: 20}]}>
                <icons.Feather  name='cloud-snow' size={25} style={{color: COLORS.grey}}/>
                <Text style={{marginHorizontal: 10, ...FONTS.h4, color: COLORS.grey}}>it's raining in london with a thunderstorm, dont forget your umbrella </Text>
            </View>
            <View style={styles.info1}>
                <View style={{marginHorizontal: 20, marginVertical: 10}}>
            <View style={styles.rowspacebetween}>
                <Text style={{color: COLORS.grey}}>5 may</Text>
                <Text style={{color: COLORS.grey}}>6 may</Text>
                </View>
                <View style={styles.rowspacebetween}>
                <Text style={{...FONTS.h1}}>19:15</Text>
                <Text style={{color: COLORS.grey}}>10hr 30m</Text>
                <Text style={{...FONTS.h1}}>13:45</Text>
                </View>
                <View style={[styles.rowspacebetween,{marginHorizontal: 0,marginVertical: 20}]}>
                <View style={styles.iconWrapper}/>
                <Text style={styles.dot}>...............{selectedIndex == 0 ? <icons.SimpleLineIcons name='plane' size={25} />
               : <Image  source={icons.train} style={{width: 25, height: 25}}/>}...............</Text>
                <View style={styles.iconWrapper}/>
            </View>
            <View style={styles.rowspacebetween}>
                <View>
                <Text style={{...FONTS.h3}}>San Francisco</Text>
                <Text style={{color: COLORS.grey}}>LFO</Text>
                </View>
                <View>
                <Text style={{...FONTS.h3, textAlign:'right'}}>London</Text>
                <Text style={{color: COLORS.grey}}>LHR</Text>
                </View>
                
                </View>
                <View>

                </View>
                </View>
                </View>
                <View style={[styles.info1, { marginVertical: 50}]}>
                <View style={[styles.rowspacebetween, {marginVertical: 20, marginHorizontal: 20}]}>
                    <View>
                       <Text style={{...FONTS.h1, textAlign: 'center'}}>3</Text>
                    <Text style={{color: COLORS.grey}}>Terminal</Text> 
                    </View>
                    <View ><Text style={{fontSize: 45,color: '#F1F1F1'}}>|</Text></View>
                    <View>
                        <Text style={{...FONTS.h1, textAlign: 'center'}}>61</Text>
                    <Text style={{color: COLORS.grey}}>Gate</Text>
                    </View>
                    <View><Text style={{fontSize: 45,color: '#F1F1F1'}}>|</Text></View>
                    <View>
                        <Text style={{...FONTS.h1, textAlign: 'center'}}>2A</Text>
                    <Text style={{color: COLORS.grey}}>Seat</Text>
                    </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <View>
                    <Text style={{textAlign:'center'}}>Submit of Registration</Text>
                    <icons.FontAwesome name='barcode' style={{fontSize: 200}}/>
                    </View>
                    
                </View>
        </View>
    )
}
