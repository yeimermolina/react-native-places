import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Wrapper from '../../hoc/Wrapper';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage';
import PickLocation from '../../components/PickLocation';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import { addPlace } from '../../store/actions';

class SharePlaceScreen extends Component {
    static navigatorStyle =  {
        navBarButtonColor: 'red'
    }

    state = {
        placeName: ''
    }

    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== "") {
            this.props.onAddPlace(this.state.placeName);
        }
    }

    placeNameChangeHandler = placeName => {
        this.setState({ placeName })
    }

    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput 
                        placeholder="Place Name"
                        placeName={this.state.placeName}
                        onChangeText={this.placeNameChangeHandler}
                    />
                    <View style={styles.button}>
                        <Button title="Share Place" onPress={this.placeAddedHandler} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 5
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(Wrapper(SharePlaceScreen));
