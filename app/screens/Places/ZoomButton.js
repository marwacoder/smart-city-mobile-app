import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import {Text} from 'native-base'
import {COLORS, SIZES, FONTS} from '../../constants'


  const ZoomButton =(props)=> {
    const mapView = React.useRef();
    
      const { mapRegion, setRegion } = props

      console.log(mapRegion)

    function zoomIn() {
        let newRegion = {
          latitude: mapRegion.latitude,
          longitude: mapRegion.longitude,
          latitudeDelta: mapRegion.latitudeDelta / 10,
          longitudeDelta: mapRegion.longitudeDelta / 10,
        };
    
        setRegion(newRegion);
        mapView.current.animateToRegion(newRegion, 100);
      }
    
      function zoomOut() {
        let newRegion = {
          latitude: mapRegion.latitude,
          longitude: mapRegion.longitude,
          latitudeDelta: mapRegion.latitudeDelta * 10,
          longitudeDelta: mapRegion.longitudeDelta * 10,
        };
    
        setRegion(newRegion);
        mapView.current.animateToRegion(newRegion, 100);
      }

      
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

  export default ZoomButton;