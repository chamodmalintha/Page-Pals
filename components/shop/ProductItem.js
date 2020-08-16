import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {
    // let TouchableCmp = TouchableOpacity;

    // if(Platform.OS === 'android' && Platform.Version >= 21) {
    //     TouchableCmp = TouchableNativeFeedback;
    // }

    return (
        <View style={styles.productMain}>
        <TouchableOpacity onPress={props.onSelect} style={styles.product}>
                    <Image style={styles.image} source={{uri: props.image}}/>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.address}>Address: {props.address}</Text>
                    <Text></Text>
                    <Text style={styles.price}>Contact: {props.price}</Text>
                </View>
                
        </TouchableOpacity> 
        <View style={styles.actions}>
            {props.children}
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    productMain:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white', 
        alignItems: 'center',
        margin:5
    },
    product: {
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        
    },
    details:{
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    image: {
        width: 110,
        height: 110,
        marginLeft: 50,
        borderRadius: 55,
        backgroundColor: '#ccc',
        borderWidth: 1
    },
    title: {
        // fontFamily: 'open-sans-bold',
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    },
    price: {
        // fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
        marginRight: 50
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginLeft: 250,
        marginTop:-15,
        marginBottom:15
    },
    address: {
        color: '#666',
        fontSize: 14,
        marginRight: 50
    }
})

export default ProductItem;