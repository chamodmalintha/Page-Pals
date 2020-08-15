import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Button } from 'react-native'; 
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import LocationPicker from '../../components/shop/LocationPicker';
import Colors from '../../constants/Colors'

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const [selectedLocation, setSelectedLocation] = useState();

    const submitHandler = useCallback(() => {
        if(editedProduct) {
            dispatch(
                productsActions.updateProduct(prodId, title, description, imageUrl, price, selectedLocation)
            );
        }
        else {
            dispatch(
                productsActions.createProduct(title, description, imageUrl, price, selectedLocation)
            );

        }
        props.navigation.goBack();
    },[dispatch, prodId, title, description, imageUrl, price, selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const locationPickedHandler = useCallback(location => {
        console.log(location);
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        // dispatch(placesActions.addPlace(titleValue, selectedImage));
        props.navigation.goBack();
      };

    // const editProductHandler = () => {
    //     props.navigation.navigate('Map');
    // };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={title} 
                        onChangeText={text => setTitle(text)} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} 
                        value={imageUrl} 
                        onChangeText={text => setImageUrl(text)} 
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Contact Details</Text>
                    <TextInput style={styles.input} 
                        value={price} 
                        onChangeText={text => setPrice(text)} 
                    />
                </View>
                
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} 
                        value={description} 
                        onChangeText={text => setDescription(text)} 
                    />
                </View>

                <View>
                    <LocationPicker 
                        navigation={props.navigation} 
                        onLocationPicked={locationPickedHandler} 
                    />
                    {/* <Button
                        title="Save Place"
                        color={Colors.primary}
                        onPress={savePlaceHandler}
                    /> */}
                </View>
                
                
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return{
        headerTitle: navData.navigation.getParam('productId')  ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Save' 
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark' } 
                onPress={submitFn} 
            />
        </HeaderButtons>
        )
    };
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8,
        fontWeight: 'bold'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1 
    }
});

export default EditProductScreen;