import React, {useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MapView, {Marker} from 'react-native-maps';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 6.9518,
        longitude: 79.9133,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    const selectLocationHandler = event => {
        setSelectedLocation({
          lat: event.nativeEvent.coordinate.latitude,
          lng: event.nativeEvent.coordinate.longitude
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            //could show an alert!
            return;
        }

        props.navigation.navigate('EditProduct', {pickedLocation: selectedLocation});
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler})
    }, [savePickedLocationHandler]);
    
      let markerCoordinates;
    
      if (selectedLocation) {
        markerCoordinates = {
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng
        };
      }

    return (
        <MapView 
            style={styles.map} 
            region={mapRegion} 
            onPress={selectLocationHandler}
        >
            {markerCoordinates && (
                <Marker title="Picked Location" coordinate={markerCoordinates} />
            )}
        </MapView>
    );
};


MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    return {
        headerRight: (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText} >Save</Text>
            </TouchableOpacity>
        )
    } 
};


const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;