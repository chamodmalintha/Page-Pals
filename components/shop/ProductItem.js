import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {
    // let TouchableCmp = TouchableOpacity;

    // if(Platform.OS === 'android' && Platform.Version >= 21) {
    //     TouchableCmp = TouchableNativeFeedback;
    // }

    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.product}>
                    <Image style={styles.image} source={{uri: props.image}}/>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    {/* <Text style={styles.price}>${props.price.toFixed(2)}</Text> */}
                    <Text style={styles.address}>{props.address}</Text>
                </View>
                <View style={styles.actions}>
                    {props.children}
                </View>
        </TouchableOpacity> 
    );
};

const styles = StyleSheet.create({
    product: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    details:{
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    // imageContainer: {
    //     width: '100%',
    //     height: '100%',
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10,
    //     overflow: 'hidden'
    // },
    image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
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
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    address: {
        color: '#666',
        fontSize: 16
    }
})

export default ProductItem;