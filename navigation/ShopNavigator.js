import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, SafeAreaView, Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'; 
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductsDetailScreen from '../screens/shop/ProductsDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import AboutUsScreen from '../screens/shop/AboutUsScreen';
import MapScreen from '../screens/user/MapScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ?  Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductsDetail: ProductsDetailScreen
    // Cart: CartScreen,
    // Logout: AuthScreen
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name={ Platform.OS === 'android' ? 'md-list' : 'ios-list' } 
            size={23}
            color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions : defaultNavOptions
}
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons name={ Platform.OS === 'android' ? 'md-bookmarks' : 'ios-bookmarks' } 
                size={23}
                color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
    );

const AdminNavigator = createStackNavigator(
{
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen,
    Map: MapScreen
}, 
{
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name={ Platform.OS === 'android' ? 'md-create' : 'ios-create' } 
            size={23}
            color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
}
);

const AboutUsNavigator = createStackNavigator(
  {
      AboutUs: AboutUsScreen
  }, 
  {
      navigationOptions: {
          drawerIcon: drawerConfig => (
              <Ionicons name={ Platform.OS === 'android' ? 'md-bookmarks' : 'ios-bookmarks' } 
              size={23}
              color={drawerConfig.tintColor}
              />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
  );

const ShopNavigator = createDrawerNavigator(
    {
      AllAvailableBooks: ProductsNavigator,
      MyPreviousReads: OrdersNavigator,
      AddBooks: AdminNavigator,
      AboutUs: AboutUsNavigator
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            {/* <Ionicons name={ Platform.OS === 'android' ? 'md-user' : 'ios-create' } 
            size={23}
            color="blue"
            /> */}
            {/* <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Chamod
          </Text> */}
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              {/* <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                    dispatch(authActions.logout());
                  props.navigation.navigate('Auth');
                }}
              /> */}
            </SafeAreaView>
          </View>
        );
      }
    }
);

const AuthNavigator = createStackNavigator(
    {
      Login: AuthScreen             //************************** */
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );
  
  const MainNavigator = createSwitchNavigator({
    // Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
  });

export default createAppContainer(MainNavigator);