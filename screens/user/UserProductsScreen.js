import React from 'react';
import { View, Text, FlatList, Button, Platform, Alert } from 'react-native'; 
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';


const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id } );
    };

    const deleteHandler = (id) => {
        Alert.alert('Are You sure?', 'Do you relly want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id));
            }}
        ]);
    }

    if (userProducts.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>There are no Books here. Please add some.</Text>
          </View>
        );
      }

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>                 //render item get the item data here and return a product item of every data.
                <ProductItem                        //product item takes some details. (title,price, image, etc..)
                     image={itemData.item.imageUrl}
                     address={itemData.item.address}
                     title={itemData.item.title}  
                     price={itemData.item.price}       
                     onSelect={() => {
                        editProductHandler(itemData.item.id);
                     }}     
                >
                    {/* <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    /> */}
                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />

                </ProductItem>
            }       
        />
    )
};

UserProductsScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Your Books',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Menu' 
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} 
            />
        </HeaderButtons>
    ),
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Add' 
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add' } 
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }} 
            />
        </HeaderButtons>
    )
    }
};

export default UserProductsScreen;