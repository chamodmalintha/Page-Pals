import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';

const AboutUsScreen = props => {

    const image = { uri: "https://firebasestorage.googleapis.com/v0/b/page-pals-new.appspot.com/o/splash.png?alt=media&token=04c0b558-14e0-47a4-9c14-8d8c9ea884a3" };
    return (
        <ScrollView>
            
            {/* <Text style={styles.heading2}>(Books Connect Us)</Text> */}
            {/* <View style={styles.actions}>
                <Image style={styles.image} source={image} />
            </View> */}

            <Image style={styles.image} source={image} />

            <Text style={styles.quote}>“If you don’t like to read, you haven’t found the right book.”</Text>
            <Text style={styles.author}>– J.K. Rowling</Text>

            <Text style={styles.heading}>Page-Pals: Books Connect Us</Text>
            
            <Text style={styles.description}>
                Page Pals is a 3rd party organization, Which offers you a Free Platform to "Exchange Books and get connected with Your Book Reading Friends" in near area.
                By using this application you can lend/exchange any kind of book without paying a single rupee. 
                You can find your interested Book and the Address of the lending person using the geographical location 
                and also you can contact the ower before you meet him/her.
                Main Objectives of Developing this kind of free platform is to to improve the Literacy of the Society, 
                increase the reading community and meet readers to each other to make them "Page-Pals". 
                
            </Text>

            <Text style={styles.description2}>* * * * * *</Text>
            <Text style={styles.terms}>
                We accept no responsibility for loss or damage to your property or your interactivity with other Page-Pals users.  
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
        width: 250,
        height: 200,
        marginLeft:50,
        marginBottom: 0,
        marginTop: 10
    },
    heading: {
        // fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#426116',
        marginVertical: 20,
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: "center"
    },
    heading2: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        margin: 20,
        marginTop: -20
    },
    description: {
        // fontFamily: 'open-sans',
        fontSize: 18,
        marginHorizontal: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    quote: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15,
        marginTop: 0
    },
    author: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 180,
        marginTop: -20,
        marginBottom: 20
    },
    terms: {
        fontSize: 15,
        margin: 20,
        color: 'red',
        textAlign: "center"
    },
    description2: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 20
    }
});

export default AboutUsScreen;