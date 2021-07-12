import React from 'react';
import {
  Spinner,
  TextArea,
  Text,
  Box,
 FormControl,
  Button,
  Image,
  Input,
 Menu
} from 'native-base';

import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, icons, images} from '../../constants';

const AddFlight = ({navigation}) => {
  const [shouldOverlapWithTrigger] = React.useState(false)
  const [photo, setPhoto] = React.useState(null);
  const {width, height} = Dimensions.get('window');


  
  const takePhotoFromGallery = () => {
    ImagePicker.openPicker({
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        setPhoto(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white',marginHorizontal: 10}}>
      <ScrollView>
      <Box >
          <Box mt={12} mx={5}>
            <View >
              <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
              Add Your Confort
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text  fontWeight='bold' color='yellow.500' fontSize='3xl'>
                Flight{' '}
                </Text>
                <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
                  Anywhere
                </Text>
              </View>
            </View>
          </Box>
          <Box style={{marginVertical: 20, marginHorizontal: 15}}>
            <FormControl>            
                <Box>
                <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Ionicons name='airplane-outline'  size={25}/>}
                        mb={3}
                          placeholder="Plane Name"
                          
                        />
                        <Input
                         isReadOnly={true}
                        _focus={{
                          borderColor:"yellow.200"
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
                        InputLeftElement={<Ionicons  size={25} name="grid-outline" />}
                        mb={3}
                          placeholder="Plane Type"
                          
                        />

                        <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Image source={icons.chair} alt='ch' style={{
                            width: 25,
                            height: 25
                        }}/>}
                        mb={3}
                          placeholder="Total No of Seat"
                          
                        />
                         <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Image source={icons.chair} alt='ch' style={{
                            width: 25,
                            height: 25
                        }}/>}
                        mb={3}
                          placeholder="Available Seat" 
                        />

                      <Button mt={3} bg='yellow.500' 
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      _text={{
                        color: "black",
                      }} spinner={<Spinner color='black' size={20}/>} >SUBMIT</Button>

                        </Box>
                        </FormControl>
                        </Box>
          </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    marginBottom: -110,
  },
  header: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  item: {
    marginHorizontal: 40,
    marginVertical: 5,
  },
  button: {
    marginHorizontal: '15%',
  },
});

export default AddFlight;
