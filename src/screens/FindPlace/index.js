import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Wrapper from '../../hoc/Wrapper';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList'

class FindPlaceScreen extends Component {
    itemSelectedHandler = key => {
        Navigation.push(this.props.componentId, {
            component: {
              name: 'awesome-places.PlaceDetailScreen',
              passProps: {
                text: 'Pushed screen',
                selectedPlace: this.props.places.find(place => place.key === key)
              },
              options: {
                topBar: {
                  title: {
                    text: 'Place Detail'
                  }
                }
              }
            }
          });
    }
    render() {
        return (
            <View>
                <Text>FindPlace Screen</Text>
                <PlaceList 
                    places={this.props.places}
                    onItemSelected={this.itemSelectedHandler}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
      places: state.places.places  
    };
}

export default connect(mapStateToProps, null)(Wrapper(FindPlaceScreen));
