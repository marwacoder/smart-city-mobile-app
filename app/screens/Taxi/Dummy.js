import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '../../constants'

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
    placeholder = 'Search'
    minLength = {2} // minimum length of text to search
    autoFocus = {true}
    fetchDetails = {true}
    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      getDefaultValue={() => ''}
     
    query = {{
      // available options: https://developers.google.com/places/web-service/autocomplete
      key : {GOOGLE_API_KEY},
      language: 'en', // language of the results
      types: '(cities)', // default: 'geocode'
    }}
    styles= {{
      description: {
        fontWeight: 'bold'
      }
      }}
/>
  );
}

export default GooglePlacesInput