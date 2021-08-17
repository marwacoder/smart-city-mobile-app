import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import {Box, Button, Menu, Input, FormControl, AspectRatio} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {COLORS, SIZES, FONTS, images, icons} from '../../constants'



const tour = [{id: '1', image: images.hikingWoman}, {id: '2',image: images.womanPhoto}]

const {width, height} = Dimensions.get('window');
const cardWidth = width / 1.8;


const styles = StyleSheet.create({
  profileName:{
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: SIZES.h2,
    fontWeight: 'bold'
  },
  txtWrapper:{
    marginHorizontal: width / 9,
    marginVertical: 10
  },
  
  btn: {
    height: 45,
    backgroundColor: COLORS.black,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20
  },
  rowspacebetween: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignContent:'center',
},
  tours:{
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  //Hotel

  card: {
    height: 200,
    width: Dimensions.get('screen').width / 1.8,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: height /4,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  
  cardDetails: {
    height: height / 16,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
  },
  cardOverLay: {
    height: 200,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 100,
    width: 100,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
})

export default function Home({navigation}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [shouldOverlapWithTrigger] = React.useState(false)

  const btn = [
    {title: 'Flight', icon: <Ionicons color={ selectedIndex == 0 ? 'white': 'black'} name='airplane-outline' size={25}/>},
    {title: 'Train', icon: <MaterialIcons color={ selectedIndex == 1 ? 'white': 'black'} name='train' size={25}/>}]

  const colorCodeHandler =(index)=>{
    setSelectedIndex(index)
}
  
  const Card = ({image, index}) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}>
        <Animated.View style={{...styles.card, transform: [{scale}]}}>
          <Animated.View style={{...styles.cardOverLay, opacity}} />
          
          <Image source={image.image} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  Paris
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  Paris
                </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={{flex: 1, backgroundColor: 'gray.200'}}>
      <Box mx={5}>
       
      <View style={styles.rowspacebetween}>
      <Text style={styles.profileName}>Hi Ahmad!</Text> 
      <MaterialIcons name="menu" size={25} />
      </View>
      <Box w='100%' shadow={1}  h={60} bg='white' borderRadius={10} flexDirection='row' justifyContent='space-between'>
       
      {btn.map((bt, index)=>(
        <Box key={index} alignSelf='center' >
          <Button w={width / 3.5} startIcon={bt.icon} _pressed={{bg: '#27272a'}} _text={{fontWeight: 'bold'}} mx={5}
          bg={index === selectedIndex ? 'black' : 'gray.200'} 
          onPress={()=>colorCodeHandler(index)}>{bt.title}</Button>  
        </Box>
      ))}
     
        
      </Box>
      <Box mx={5} mb={5}>
    <Text style={{ fontSize: 40}}>Find {selectedIndex == 0 ? 'flight' : 'train'} that</Text>
    <Text style={{fontSize: 40}}>suits your timing</Text>
      <Text style={{fontSize: 40}}>and budget</Text>
      </Box>
      <Box mx={15} mb={4} borderRadius={10} bg='white' shadow={1}>
        <Box mx={15} my={25}>
        <Box >
                      <FormControl>
                        <Input 
                        _focus={{
                          borderColor:"black"
                        }}
                        isReadOnly={true}
                        InputRightElement={<Menu
                          shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                          placement='left'
                          trigger={(triggerProps) => {
                            return (
                              <Button bg='blueGray.50' _pressed={{
                                bg: 'blueGray.50'
                              }} _text={{
                                color:'black'
                              }}  startIcon={<AntDesign name='down'   size={20}/>} alignSelf="center"  {...triggerProps}></Button>
                            )
                          }}
                        >
                          <Menu.Item>Large Menu item 1</Menu.Item>
                          <Menu.Item>Large Menu item 2</Menu.Item>
                          <Menu.Item>Large Menu item 3</Menu.Item>
                        </Menu>}
                        InputLeftElement={
                         selectedIndex == 0 ? <FontAwesome5  name='plane-departure' type='' size={20} color='black'/> :
                         <Box >
                           <Image  source={icons.train} style={{width: 25, height: 25}}/>
                         </Box>
                          
                        } variant='underlined' placeholder="From" />
                      
                        <Input 
                        isReadOnly={true}
                        _focus={{
                          borderColor:"black"
                        }}
                        InputRightElement={<Menu
                          shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                          placement='left'
                          trigger={(triggerProps) => {
                            return (
                              <Button bg='blueGray.50' _pressed={{
                                bg: 'blueGray.50'
                              }} _text={{
                                color:'black'
                              }}  startIcon={<AntDesign name='down'   size={20}/>} alignSelf="center"  {...triggerProps}></Button>
                            )
                          }}
                        >
                          <Menu.Item>Large Menu item 1</Menu.Item>
                          <Menu.Item>Large Menu item 2</Menu.Item>
                          <Menu.Item>Large Menu item 3</Menu.Item>
                        </Menu>}

                        InputLeftElement={
                         selectedIndex == 0 ? <FontAwesome5 size={20}  name='plane-arrival'  color='black'/>:
                          <Box style={{transform: [{rotateY: '180deg'}]}}>
                           <Image  source={icons.train} style={{width: 25, height: 25}}/>
                         </Box>
                        } variant='underlined' placeholder="To" />
                        </FormControl>
                      </Box>
                </Box>          
      </Box>
        <Box mx={5} flexDirection='row' justifyContent='space-between' alignContent='center'>
          <Box/>
          <Button
      
            bg='black'
            _pressed={{
                bg: 'blueGray.500'
            }}
             _text={{
                fontWeight:'bold'
            }} endIcon={
                <Ionicons  color='white' size={25} name='md-chevron-forward-sharp'/>
            }   onPress={()=> navigation.navigate('Flight',{"selectedIndex": selectedIndex})}>
                   CONTINUE
          </Button>
      
        </Box>
      <View >
        <Box >
          <Text style={{fontWeight: 'bold', ...FONTS.h3}}>Best Tours</Text>
        </Box>
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={e => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={tour}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card image={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
      </View>
      </Box>
    </View>
  )
}

