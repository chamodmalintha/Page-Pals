import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';

const MapScreen = props => {

    return (
        <View>
            <Text>
                This is Your Location. 
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default MapScreen;