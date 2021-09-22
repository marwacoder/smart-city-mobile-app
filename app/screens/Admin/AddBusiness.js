import React, {useCallback} from 'react';
import {
  TextArea,
  Text,
  Button,
  Box,
  Input,
  Menu,
  useToast,
  Divider,
  FormControl,
} from 'native-base';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';

import {icons} from '../../constants'


import {launchImageLibrary} from 'react-native-image-picker'

import {addBusiness, getBusiness} from '../../store/actions'
import {useDispatch, useSelector} from 'react-redux'


const BUSINESS = ['Airline', 'Hotel', 'Restaurant', "Taxi", 'Logistic', 'Bus', 'Event', 'Train','Apartment']

const AddItem = ({route, navigation}) => {
  const [shouldOverlapWithTrigger] = React.useState(false)
  const [showPass, setShowPass] = React.useState(false);
  
  
  const [businessName, setBusinessName] = React.useState('');
  const [typeofBusiness, setTypeofBusiness] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { message, isLoading, error } =  useSelector(state => state.business || [])
const dispatch = useDispatch();
  const toast = useToast();


  const onShowPass =()=> setShowPass(!showPass)
 
  


  const takeBusinessPhotoFromGallery = () => {
    launchImageLibrary({ noData: true }, (response) => {
        // console.log(response);
        if (response) {
          setPhoto(response);
        }
      });
  };
 
  React.useEffect(() => {
    if (typeof route.params !== 'undefined') {
      setBusinessDetails({
        businessName: route.params.name,
        location: route.params.location,
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        description: route.params.description,
      });
    }
    
  }, []);


 

 const onSubmitHandler = ()=> {
   
  dispatch(addBusiness({photo, businessName, typeofBusiness, location, latitude, longitude, email, phoneNumber, description, password}))
  if (error === true ){
    toast.show({
    title: message,
    status: "error",
    placement: 'top-right',
    description: "Error Adding Business",
  })
  }else {
    toast.show({
      title: message,
      status: "success",
      placement: 'top-right',
      description: "Success Adding Business"
    })
  }  
  }

  


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView  >
        <Box >
          <Box mt={12} mx={5}>
            <View >
              <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
                Create your
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text  fontWeight='bold' color='yellow.500' fontSize='3xl'>
                  Business{' '}
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
                        InputLeftElement={<icons.MaterialIcons active size={25} name="business" />}
                        mb={3}
                          placeholder="Business Name"
                          onChangeText={(text)=>setBusinessName(text)}
                          value={businessName}
                        />

                        <Input
                        isReadOnly={true}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.Ionicons  size={25} name="grid-outline" />}
                        InputRightElement={<Menu
                          shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                          placement='left'
                          trigger={(triggerProps) => {
                            return (
                              <Button bg='blueGray.50' _pressed={{
                                bg: 'blueGray.50'
                              }} _text={{
                                color:'black'
                              }}  startIcon={<icons.AntDesign name='down'   size={20}/>} alignSelf="center"  {...triggerProps}></Button>
                            )
                          }}
                        >
                          {BUSINESS.map((bus, index)=> (
                            <Box key={index}>
                              <Menu.Item   onPress={()=>setTypeofBusiness(bus)}>{bus}</Menu.Item>
                              <Divider/>
                            </Box>
                          ))}
                          
                        </Menu>}
                        mb={3}
                          placeholder="Business Type"
                          value={typeofBusiness}
                        />

<Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.Fontisto name='email'  size={20}/>}
                        mb={3}
                          placeholder="Business Email Address"
                          onChangeText={(text)=>setEmail(text)}
                          value={email}
                        />
                        <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.AntDesign active size={25} name="phone" />}
                        mb={3}
                          placeholder="Business Phone Number"
                          onChangeText={(text)=>setPhoneNumber(text)}
                          value={phoneNumber}
                        />

                      <Input
                      onChangeText={(text)=>setLocation(text)}

                      _focus={{
                        borderColor:"yellow.200"
                      }}
                      mb={3}
                        InputLeftElement={<icons.MaterialIcons active size={25}  name="location-on" />}
                  
                        placeholder="Location"
                          value={location}
                        />

                        <Input
                        onChangeText={(text)=>setLatitude(text)}
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.MaterialCommunityIcons active size={25} name="latitude" />}
                  
                        placeholder="Latitude"
                        value={latitude}
                        />
                        <Input
                        onChangeText={(text)=>setLongitude(text)}
                        
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.MaterialCommunityIcons active size={25} name="longitude" />}
                  
                        placeholder="Longitude"
                        value={longitude}
                        />
                         <Input
                         type={ showPass ? 'password': 'text'}
                         onChangeText={(text)=>setPassword(text)}
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.MaterialCommunityIcons active size={25} name="lock" />}
                        InputRightElement={<Box mr={2} >{showPass ? <icons.Ionicons  onPress={onShowPass} size={25} name="ios-eye" />:<icons.Ionicons onPress={onShowPass}  size={25} name="ios-eye-off" />}</Box> }
                  
                        placeholder="Password"
                        value={password}
                        />
                        <TextArea
                        onChangeText={(text)=>setDescription(text)}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        mb={3}
                        placeholder="Description of Business"
                       value={description}
                        />

                        <Button
                        onPress={takeBusinessPhotoFromGallery}
                        _text={{
                          color: 'black'
                        }}
                        _pressed={{
                        bg: 'yellow.300'
                      }}    endIcon={photo ? <icons.MaterialIcons name='check-circle'  size={20}/> :<icons.MaterialIcons name='add-a-photo'  size={20}/>} bg='yellow.500'>
                        UPLOAD IMAGE
                      </Button>

                      <Button mt={3} bg='yellow.500' 
                      onPress={onSubmitHandler}
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      _text={{
                        color: "black",
                      }} isLoading={isLoading} isLoadingText="Submitting"  >SUBMIT</Button>

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
    marginBottom: -210,
    marginHorizontal: 20
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

export default AddItem;
