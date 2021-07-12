import * as actionTypes from '../actions/actionTypes'
  
  const initialState = {
    business: [],
    isLoading: false,
    error: null
  };
  
  const businessReducer =(state = initialState, action)=> {
    switch (action.type) {
      case actionTypes.GET_BUSINESS_START:
        return {isLoading: true};
      case actionTypes.GET_BUSINESS_SUCCESS:
        return { ...state };
      case actionTypes.GET_BUSINESS_FAIL:
        return {
        error: 'error'
        };
      default:
        return state;
    }
  }
  
module.exports = {businessReducer}

/*
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
            <View style={[styles.dotWrapper, {backgroundColor: 'rgba(274, 70, 86, .25)'}]}>
                    <View style={[styles.dot,{backgroundColor: '#E04F5B'}]}/>
                    
                </View>
                
            </Marker>
            <Marker
            coordinate={{
                longitude: toLocation.longitude,
                latitude: toLocation.latitude
              }}
            >
                <View style={[styles.dotWrapper, {backgroundColor: 'rgba(63,103,255, .24)'}]}>
                    <View style={[styles.dot,{backgroundColor: COLORS.blue}]}/>
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


*/