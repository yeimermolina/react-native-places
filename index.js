/** @format */
import React from 'react';
import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/index';

import AuthScreen from './src/screens/Auth';
import FindPlaceScreen from './src/screens/FindPlace'
import SharePlaceScreen from './src/screens/SharePlace'
import PlaceDetailScreen from './src/screens/PlaceDetail'
import SideDrawerScreen from './src/screens/SideDrawer'

const store = configureStore()

function WrappedComponent(Component) {
    return function inject(props) {
      const EnhancedComponent = () => (
        <Provider store={store}>
          <Component
            {...props}
          />
        </Provider>
      );
  
      return <EnhancedComponent />;
    };
  }

Navigation.registerComponent(`awesome-places.AuthScreen`, () => WrappedComponent(AuthScreen));
Navigation.registerComponent(`awesome-places.FindPlaceScreen`, () => WrappedComponent(FindPlaceScreen));
Navigation.registerComponent(`awesome-places.SharePlaceScreen`, () => WrappedComponent(SharePlaceScreen));
Navigation.registerComponent(`awesome-places.PlaceDetailScreen`, () => WrappedComponent(PlaceDetailScreen));
Navigation.registerComponent(`awesome-places.SideDrawerScreen`, () => WrappedComponent(SideDrawerScreen));



Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        topBar: {
          background: {
            color: 'orange'
          },
          title: {
            color: 'white',
          },
          backButton: {
            title: '', // Remove previous screen name from back button
            color: 'white'
          },
          buttonColor: 'white',
        },
        statusBar: {
          style: 'light'
        },
        layout: {
          orientation: ['portrait']
        },
        bottomTabs: {
          titleDisplayMode: 'alwaysShow'
        },
        bottomTab: {
          textColor: 'gray',
          selectedTextColor: 'orange',
          iconColor: 'gray',
          selectedIconColor: 'orange',
        }
    });
    Navigation.setRoot({
    root: {
        component: {
        id: 'login-screen',
        name: "awesome-places.AuthScreen",
        title: "dddd",
        text: 'dddd',
        options: {
            topBar: {
              title: {
                  text: 'Share Place'
              }
          }
        }
    }   
    }});
});