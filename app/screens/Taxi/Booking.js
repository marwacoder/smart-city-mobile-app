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
  import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY,} from '../../constants/';
  import mapStyle from '../style';

  import PaymentButton from '../Payment';

    const Booking =({navigation})=> {
        const [showPayment, setShowPayment] = React.useState(false);
        const [fromLocation, setFromLocation] = React.useState({
            latitude: 0,
            longitude: 0,
          });
        
          const [toLocation, setToLocation] = React.useState({
            latitude: 11.1345311,
            longitude: 7.7044702,
          });
        const mapView = React.useRef(); 
        const {width, height} = Dimensions.get('window');
      
        const ASPECT_RATIO = width/ height;

        React.useEffect(() => {
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
 
        const OptionItem = ({icon, label, onPress}) => {
    

            return (
              <TouchableOpacity
                style={{justifyContent: 'center', marginHorizontal: 40, marginVertical: 10}}
                onPress={onPress}>
                <View>
                <Text
                  style={{marginTop: SIZES.base, color: COLORS.black, ...FONTS.body3}}>
                  {label}
                </Text>
                    <Image
                      source={icon}
                      resizeMode="cover"
                      style={{
                        width: 35,
                        height: 35,
                      }}
                    />
                </View>
                
              </TouchableOpacity>
            );
          };
          

    return (
        <View style={{flex: 1}}>
            {showPayment && 
            <PaymentButton setShowPayment={setShowPayment} showPayment={showPayment} amount={'2000'}
            billingEmail={'setinsoft@gmail.com'} billingMobile={'08034074748'} billingName={'Jibril Mohammed'}/>}
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
                 <Text>destination direction</Text>
                <Icon type='Feather' name='chevron-right' size={20} style={{color: COLORS.gray}}/>
                <Icon type='MaterialIcons' name='arrow-drop-down' size={20} style={styles.arrowDown}/>
                
            </View>
                <View style={[styles.dotWrapper, {backgroundColor: 'rgba(2, 213, 155, .24)'}]}>
                    <View style={[styles.dot,{backgroundColor: '#02b59d'}]}/>
                </View>
            </Marker>
            <Marker
            coordinate={{
                latitude: 11.1285912,
            longitude: 7.7064167
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
                latitude: 11.131373,
                longitude: 7.705157
            }}
            apikey={GOOGLE_API_KEY} 
            mode='WALKING'
            strokeColor='#5b5c69' strokeWidth={4} lineDashPattern={[6,6]}
            />
                 </MapView>
         <View >
             <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Icon name="menu" size={25} type="MaterialIcons" />
            <TouchableOpacity onPress={()=>navigation.navigate('taxiHome')}><Icon name="close" size={25} type="MaterialIcons" /></TouchableOpacity>
          </View>
          </SafeAreaView>
         
          </View>
            
          <View style={styles.buttomContent}>
              <View style={styles.marker}>
              <Icon name="grid" size={20} type='Ionicons' style={{color: COLORS.white}}/>
              </View>
          <View style={styles.vehicleWrapper}>

          <OptionItem
            icon={icons.taxi}
            label="Taxi"
            onPress={() => {
              console.log('Taxi');
            }}
          />
          <OptionItem
            icon={icons.bus}
            label="Bus"
            onPress={() => {
              console.log('Bus');
            }}
          />
          <OptionItem
            icon={icons.van}
            label="Van"
            onPress={() => {
              console.log('Bus');
            }}
          />
          <OptionItem
            icon={icons.truck}
            label="Truck"
            onPress={() => {
              console.log('Bus');
            }}
          />
          </View>
          <View style={styles.infoWrapper}>
              <Text style={{fontSize: 20, color: COLORS.gray}}>LKR-550 600</Text>
              <View style={styles.note}><Text style={{fontWeight: 'bold', color: COLORS.gray}}>Note: </Text>
              
              <Text style={styles.info}>This is an approximate estimate. Actual cost may be different due to traffic and waiting line</Text>
              </View>
              
          </View>
          <View style={styles.cashWrapper}>
             <View style={styles.cash}>
                <TouchableOpacity >
                <Icon name='credit-card' type='FontAwesome' size={20}/>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: COLORS.gray}}>Cash</Text>  
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='cash' type='MaterialCommunityIcons' size={20}/>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: COLORS.gray}}>Card</Text>
                </TouchableOpacity>
             </View>
         </View>
         <Button full 
        onPress={() => {
            setShowPayment(true);
          }}
         style={{backgroundColor: COLORS.black}}
         ><Text style={{color: COLORS.white, fontSize: 20}}>Book Now</Text></Button>
        </View> 
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

export default Booking;
