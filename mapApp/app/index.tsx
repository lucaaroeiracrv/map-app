import React, { useEffect, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { markers } from '../assets/marker';
import { useNavigation } from 'expo-router';

// Ponto inicial do mapa ao abrir o APP
const INITIAL_REGION = {
	latitude: -22.87,
	longitude: -47.05,
	latitudeDelta: 2,
	longitudeDelta: 2
};

export default function App() {

  const mapRef = useRef<any>();
  const navigation = useNavigation();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(() => {
      SplashScreen.hideAsync();  
    }, 4000);
  }, []);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={focusPlace}>
					<View style={{ padding: 10 }}>
						<Text>Focus</Text>
					</View>
				</TouchableOpacity>
			)
		});
	}, []);

  const focusPlace = () => {
      const TorreDoCastelo = {
        latitude: -22.890128,
        longitude: -47.077229,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
    };
    // console.log('OI');
		mapRef.current?.animateToRegion(TorreDoCastelo);
  };
  
  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  const selectMarker = (marker: any) => {
    Alert.alert(marker.name);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView 
      style={StyleSheet.absoluteFillObject} 
      provider={PROVIDER_GOOGLE} 
      initialRegion={INITIAL_REGION}
      showsUserLocation
      showsMyLocationButton
      onRegionChangeComplete={onRegionChange}
      ref={mapRef}>
        {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} onPress={() => selectMarker(marker)} />
        ))};
        </MapView>
    </View>
  );
}
