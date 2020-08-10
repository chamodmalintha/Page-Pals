import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';

const AboutUsScreen = props => {

    const image = { uri: "https://picsum.photos/200/319" };
    return (
        <ScrollView>
            <Text style={styles.price}>Page-Pals</Text>
            {/* <View style={styles.actions}>
                <Image style={styles.image} source={image} />
            </View> */}
            <Text style={styles.description}>
                Page Pals is a 3rd party organization. Main objective is to provide a platform to support Reasding Community to 
                share their books and increase the reading.
                
            </Text>
        </ScrollView>
    )
}

AboutUsScreen.navigationOptions = navData => {
    return {
        headerTitle: "About Us",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          )
    };
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        // fontFamily: 'open-sans-bold',
        fontSize: 30,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        // fontFamily: 'open-sans',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default AboutUsScreen;