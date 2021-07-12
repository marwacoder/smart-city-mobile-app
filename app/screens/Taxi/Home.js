import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView, ScrollView
} from 'react-native';
import {Button} from 'native-base'
import {Grid, Col} from 'react-native-easy-grid'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Icon} from 'native-base';
import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY,} from '../../constants/';

const sideIcon = [
  {title: 'Taxi', icon: icons.taxi},
  {title: 'Bus', icon: icons.bus},
  {title: 'Van', icon: icons.van},
  {title: 'Truck', icon: icons.truck}

]
import mapStyle from '../style';

const Home =({navigation})=> {
  const mapView = React.useRef(); 
  const [fromLocation, setFromLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const [toLocation, setToLocation] = React.useState({
    latitude: 11.1345311,
    longitude: 7.7044702,
  });

  const {width, height} = Dimensions.get('window');
  const [selectedIndex, setSelectedIndex] = React.useState(0)


  const colorHandler =(index)=>{
      setSelectedIndex(index)
  }
  
  React.useEffect(() => {
      Geolocation.getCurrentPosition(position => {
      setFromLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);


  let mapRegion = {
    latitude: fromLocation.latitude,
    longitude: fromLocation.longitude,
    latitudeDelta: 10,
    longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height *10,
  };
 
  const OptionItem = ({onPress}) => {

    return (
      <View
      style={styles.vehicleWrapper}
        onPress={onPress}>
          
          {sideIcon.map((val, index)=> (
            <TouchableOpacity style={{flex: 1, marginHorizontal: 10}}  key={index} onPress={()=>colorHandler(index)}>
              <View >
            <Image
              source={val.icon}
              resizeMode="cover"
              style={{
                width: 35,
                height: 35,
               opacity: selectedIndex !== index ? 0.4  : 1
              }}
            />
        </View>
        <Text
          style={{marginTop: SIZES.base, color: selectedIndex !== index ? COLORS.gray  : COLORS.black, ...FONTS.body3}}>
          {val.title}
        </Text>
        </TouchableOpacity>
          ))}
        
      </View>
    );
  };
  

  return (
    <View style={{flex: 1}}>
     
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapRegion}
        customMapStyle={mapStyle}
        style={StyleSheet.absoluteFillObject}
        >
          <Marker
          coordinate={{
            latitude: fromLocation.latitude,
            longitude: fromLocation.longitude
          }}
          >
            <View style={styles.pin}>
              <Fontisto name="map-marker-alt" size={25}  style={{color: '#0ddda2'}}/>
            </View>
          </Marker>
          <Marker
          coordinate={{
            latitude: fromLocation.latitude,
            longitude: fromLocation.longitude
          }}
          >
            <View style={styles.marker}>
              <Ionicons name="navigate" size={20}  style={{color: '#fff'}}/>
            </View>
          </Marker>
        </MapView>
      <View>
      
        <SafeAreaView style={styles.container}>
          <View>
            <MaterialIcons name="menu" size={25} type="MaterialIcons" />
          </View>
          <TouchableOpacity style={styles.search}  onPress={()=> navigation.navigate('taxiDummy')}>
            <View style={styles.inputWrapper}>
              <View style={styles.greenDot} />
              <View>
                <Text style={styles.inputTex}>{fromLocation.latitude}, {fromLocation.longitude}</Text>
              </View>
            </View>
            <View>
              <FontAwesome name="heart-o" type="FontAwesome" />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
          <View style={{marginVertical: -500, marginTop: -50}}>
        <View >
          
            <Grid >
          
          <Col>
          <View >
          <OptionItem
          /></View>
          </Col>
          
         
          </Grid>
        </View> 
        <View style={styles.buttonWrapper}>
        <Button full style={styles.btn} onPress={()=> navigation.navigate('taxiPlaces')}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
              PickMe Here
            </Text>
          </Button>
      </View>  
      </View>

      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  search: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between'
  },
  greenDot: {
    width: 10,
    height: 10,
    backgroundColor: '#0ddda2',
    borderRadius: 10,
    marginRight: 10,
  },
  inputTex: {
    fontWeight: '600',
    color: '#8b8d96',
    
  },
  vehicleWrapper: {
    color: 'red',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    height: Dimensions.get('window').height /2,
    top: Dimensions.get('window').height / 5,
    padding: 20,
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    shadowColor: '#000',
    shadowOffset:{
      width: 2,
      height: 2,
    },
  shadowRadius: 20,
  shadowOpacity: 0.1
  },
  buttonWrapper: {
    marginVertical: Dimensions.get('window').height / 1.25,
   
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: COLORS.black,
    marginHorizontal: 70,
  },
  pin: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: 'rgba(2,220,159,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  marker: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;