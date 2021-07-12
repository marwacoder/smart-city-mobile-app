import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    SafeAreaView, ScrollView
  } from 'react-native';
  import {Grid, Col, Button} from 'native-base'
  import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
  import MapViewDirections from 'react-native-maps-directions';
  import Geolocation from '@react-native-community/geolocation';
  import {Icon} from 'native-base';
  import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY,} from '../constants/';
  import mapStyle from './style';

    const BusinessLocation =({route, navigation})=> {
      const [businessName, setBusinessName] = React.useState('');
        const [fromLocation, setFromLocation] = React.useState({
            latitude: 0,
            longitude: 0,
          });
        
          const [toLocation, setToLocation] = React.useState({
            latitude: 0,
            longitude: 0,
          });
          const [region, setRegion] = React.useState(null);

        const mapView = React.useRef(); 
      
        React.useEffect(() => {
          let {businessName, location} = route.params;
          setBusinessName(businessName);
          setToLocation({latitude: location.latitude, longitude: location.longitude})
            Geolocation.getCurrentPosition(position => {
            setFromLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          });
          
        }, []);

        let fromLoc = fromLocation;
        let toLoc = toLocation;

  let mapRegion = {
    latitude: fromLocation.latitude,
    longitude: fromLocation.longitude,
    latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
    longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
  };
 


  function zoomIn() {
    let newRegion = {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      latitudeDelta: mapRegion.latitudeDelta / 2,
      longitudeDelta: mapRegion.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function zoomOut() {
    let newRegion = {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      latitudeDelta: mapRegion.latitudeDelta * 2,
      longitudeDelta: mapRegion.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}>
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomIn()}>
          <Text style={{...FONTS.body1}}>+</Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomOut()}>
          <Text style={{...FONTS.body1}}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }



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
                
                 <View style={[styles.toolTips, {borderLeftColor: '#02b59d'}]}>
                 <Text>{businessName}</Text>
                <Icon type='Feather' name='chevron-right' size={20} style={{color: COLORS.gray}}/>
                <Icon type='MaterialIcons' name='arrow-drop-down' size={20} style={styles.arrowDown}/>
                
            </View>
                <View style={[styles.dotWrapper, {backgroundColor: 'rgba(2, 213, 155, .24)'}]}>
                    <View style={[styles.dot,{backgroundColor: '#02b59d'}]}/>
                </View>
            </Marker>
            <Marker
            coordinate={{
                longitude: toLocation.longitude,
                latitude: toLocation.latitude
              }}
            >
                <View style={[styles.toolTips, {borderLeftColor: '#E04F5B'}]}>
                <Text>source direction</Text>
                <Icon type='Feather' name='chevron-right' size={20} style={{color:COLORS.gray}}/>
                <Icon type='MaterialIcons' name='arrow-drop-down' size={20} style={styles.arrowDown}/>
                
                </View>
                               <View style={[styles.dotWrapper, {backgroundColor: 'rgba(274, 70, 86, .25)'}]}>
                    <View style={[styles.dot,{backgroundColor: '#E04F5B'}]}/>
                </View>
            </Marker>
              
            <MapViewDirections
            origin={{
                latitude: fromLocation.latitude,
            longitude: fromLocation.longitude
            }}
            destination={{
              longitude: toLocation.longitude,
              latitude: toLocation.latitude
            }}
            apikey={GOOGLE_API_KEY} 
            mode='WALKING'
            strokeColor='#5b5c69' strokeWidth={4} lineDashPattern={[6,6]}
            />
                 </MapView>
         <View >
         <SafeAreaView style={styles.container}>
          <View>
            <Icon name="menu" size={25} type="MaterialIcons" />
          </View>
          <TouchableOpacity style={styles.search}  onPress={()=> navigation.navigate('taxiDummy')}>
            <View style={styles.inputWrapper}>
              <View style={styles.greenDot} />
              <View>
                <Text style={styles.inputTex}>{fromLocation.latitude}, {fromLocation.longitude}</Text>
              </View>
            </View>
            <View>
              <Icon name="heart-o" type="FontAwesome" />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
         
          </View>
            
          <View style={styles.buttomContent}>
              <View style={styles.marker}>
              <Icon name="grid" size={20} type='Ionicons' style={{color: COLORS.white}}/>
              </View>
           <View style={styles.infoWrapper}>
              <Text style={{fontSize: 20, color: COLORS.gray}}>LKR-550 600</Text>
              <View style={styles.note}><Text style={{fontWeight: 'bold', color: COLORS.gray}}>Note: </Text>
              
              <Text style={styles.info}>This is an approximate estimate. Actual cost may be different due to traffic and waiting line</Text>
              </View>
              
          </View>
        </View> 
        {renderButtons()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
      },
      header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 20,
        width: Dimensions.get('window').width,
        marginTop: 20,
        backgroundColor: '#fff'
      },
      
      buttomContent: {
          position: 'absolute',
          bottom: 0,
          width: Dimensions.get('window').width
      },
      marker: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: 'rgba(0,0,0,.5)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 30
      },
      infoWrapper: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5F5F6',
          paddingHorizontal: 25,
          marginVertical: 10
      },
      note: {
          flexDirection: 'row',
          backgroundColor: '#F5F5F6'
      },
      info: {
        color: COLORS.gray,
          alignSelf: 'center',
          textAlign:'center'
      },
      cashWrapper: {
        marginHorizontal: Dimensions.get('window').width / 6,
      },
      cash: {
        flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
      },
      dotWrapper: {
          width: 30,
          height: 30,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center'
      },
      dot: {
        height: 10,
        width: 10,
        borderRadius: 10
      },
      toolTips: {
          width: 220,
          position: 'relative',
          backgroundColor: '#fff',
          flexDirection: 'row',
          borderLeftWidth: 6,
          justifyContent: 'space-between',
          padding: 10,
          
          shadowColor: '#000',
          shadowOffset:{
              width: 0,
              height: 2
          },
          shadowRadius: 5,
          shadowOpacity: 0.05,
          borderRadius: 5,
          marginBottom: 20
      },
      arrowDown: {
          position: 'absolute',
          bottom: -20,
          left: 100,
          color: COLORS.gray
      }

})

export default BusinessLocation;
