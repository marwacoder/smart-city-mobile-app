import React from 'react';
import {
  TextArea,
Menu,
  Text,
  Button,
  Input,
  FormControl,
  Image,
  Box,
  Spinner
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
import Fontisto from 'react-native-vector-icons/Fontisto'

import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, icons, images} from '../../constants';
const AddRoom = ({route, navigation}) => {
  
  const [shouldOverlapWithTrigger] = React.useState(false)
  const [businessDetails, setBusinessDetails] = React.useState({
    busName: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    imagePath: '',
  });
  



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

  
  React.useEffect(() => {
    if (typeof route.params !== 'undefined') {
      setBusinessDetails({
        busName: route.params.name,
        location: route.params.location,
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        description: route.params.description,
      });
    }
    
  }, []);

  return (
    <SafeAreaView >
      <ScrollView
         >
        <Box flex={1} bg='white'> 

        <Box >
          <Box mt={12} mx={5}>
            <View >
              <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
              Add your
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text  fontWeight='bold' color='yellow.500' fontSize='3xl'>
                Comfort{' '}
                </Text>
                <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
                  Suite
                </Text>
              </View>
            </View>
          </Box>
          <Box style={{marginVertical: 20, marginHorizontal: 15}}>
            <FormControl>            
                <Box>
                        
                        <Input
                         isReadOnly={true}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Ionicons  size={25} name="business" />}
                        mb={3}
                          placeholder="Room Name"
                          
                        />

                      <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Fontisto  name="room" size={20}/>}
                        mb={3}
                          placeholder="Room Number"
                          
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

                        InputLeftElement={<Ionicons  size={25} name="business"/>}
                        mb={3}
                          placeholder="Room Type"
                          
                        />
                        <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialIcons  size={25} name="reduce-capacity"/>}
                        mb={3}
                          placeholder="Capacity"
                          
                        />
                         <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Entypo  size={25} name="price-tag" />}
                        mb={3}
                          placeholder="Price"
                          
                        />
                        <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialIcons  size={25} name="smoking-rooms" />}
                        mb={3}
                          placeholder="Smoke"
                          
                        />
                        <TextArea
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        mb={3}
                        placeholder="Description"
                       
                        />
                        <Button
                        onPress={takePhotoFromGallery}
                        _text={{
                          color: 'black'
                        }}
                        _pressed={{
                        bg: 'yellow.300'
                      }}    endIcon={photo ? <MaterialIcons name='check-circle'  size={20}/> :<MaterialIcons name='add-a-photo'  size={20}/>} bg='yellow.500'>
                        UPLOAD IMAGE
                      </Button>

                      <Button mt={3} bg='yellow.500' 
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      _text={{
                        color: "black",
                      }} spinner={<Spinner color='black' size={20}/>} isLoading={true} >SUBMIT</Button>

                        </Box>
                        </FormControl>
                        </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    marginBottom: -210,
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
    backgroundColor: COLORS.primary,
  },
});

export default AddRoom;







          {/* <View style={style.header}>
            <View style={{paddingBottom: 15}}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>Add your</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Comfort </Text>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: COLORS.orange,
                  }}>
                  Suite
                </Text>
              </View>
            </View>
          </View>

          <Box style={{marginVertical: 20, marginHorizontal: 15}}>
            <FormControl>
              {deviceWidth < deviceHeight && (
                <Box>
                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon active name="business" />
                        <Input
                          placeholder="Room Name"
                          value={businessDetails.busName}
                        />
                      </Box>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon active type="Fontisto" name="room" />
                        <Input
                          placeholder="Room number"
                          value={businessDetails.location}
                        />
                      </Box>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon
                          type="MaterialIcons"
                          active
                          name="reduce-capacity"
                        />
                        <Input
                          placeholder="Maximum Capacity"
                          value={businessDetails.latitude}
                        />
                      </Box>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon type="Entypo" active name="price-tag" />
                        <Input
                          placeholder="Price"
                          value={businessDetails.latitude}
                        />
                      </Box>
                    </Col>
                  </Grid>

                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon
                          type="MaterialIcons"
                          active
                          name="smoking-rooms"
                        />
                        <Input
                          placeholder="Smoke"
                          value={businessDetails.longitude}
                        />
                      </Box>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon type="MaterialIcons" name="description" />
                        <Textarea
                          placeholder="Room Description"
                          value={businessDetails.description}
                        />
                      </Box>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      
                      <Button
                        transparent
                        full
                        activeOpacity={0.5}
                        onPress={selectFile}>
                        <Text style={{color: COLORS.orange}}>
                          Select Room Image
                        </Text>
                      </Button>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      <Button
                        full
                        activeOpacity={0.5}
                        onPress={uploadImage}
                        style={{
                          backgroundColor: COLORS.primary,
                          marginVertical: 5,
                        }}>
                        <Text>Submit</Text>
                      </Button>
                    </Col>
                  </Grid>
                </Box>
              )}
              {deviceWidth > deviceHeight && (
                <Box>
                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon active name="business" />
                        <Input placeholder="Room Name" />
                      </Box>
                    </Col>
                    <Col>
                      <Box style={style.item}>
                        <Icon active type="Fontisto" name="room" />
                        <Input
                          placeholder="Room number"
                          value={businessDetails.location}
                        />
                      </Box>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon
                          type="MaterialIcons"
                          active
                          name="reduce-capacity"
                        />
                        <Input
                          placeholder="Maximum Capacity"
                          value={businessDetails.latitude}
                        />
                      </Box>
                    </Col>
                    <Col>
                      <Box style={style.item}>
                        <Icon type="Entypo" active name="price-tag" />
                        <Input
                          placeholder="Price"
                          value={businessDetails.latitude}
                        />
                      </Box>
                    </Col>
                    <Col>
                      <Box style={style.item}>
                        <Icon
                          type="MaterialIcons"
                          active
                          name="smoking-rooms"
                        />
                        <Input
                          placeholder="Smoke"
                          value={businessDetails.longitude}
                        />
                      </Box>
                    </Col>
                  </Grid>

                  <Grid>
                    <Col>
                      <Box style={style.item}>
                        <Icon type="MaterialIcons" name="description" />
                        <Textarea placeholder="Description of Business" />
                      </Box>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      
                      <Button
                        transparent
                        full
                        activeOpacity={0.5}
                        onPress={selectFile}>
                        <Text style={{color: COLORS.orange}}>
                          Select Room Image
                        </Text>
                      </Button>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col>
                      <Button
                        full
                        style={style.button}
                        activeOpacity={0.5}
                        onPress={uploadImage}>
                        <Text>Submit</Text>
                      </Button>
                    </Col>
                  </Grid>
                </Box>
              )}
            </FormControl>
          </Box> */}
       