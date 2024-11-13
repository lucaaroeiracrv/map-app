import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { markers } from '@/assets/marker';

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 2,
    longitudeDelta: -2,
};

export default function App() {

    const onMarkerSelected = (marker: any) => {
        alert(marker.nome);
    }
  return (
    <View style={{flex: 1}}>
      <MapView 
      style={StyleSheet.absoluteFill} 
      provider={PROVIDER_GOOGLE} 
      initialRegion={INITIAL_REGION}
      showsUserLocation 
      showsMyLocationButton
      >
        {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} onPress={onMarkerSelected}/>
        ))}
        </MapView>
    </View>
  );
}
