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
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
    static navigatorStyle =  {
        navBarButtonColor: 'red'
    }

    state = {
        placeName: '',
        controls: {
            placeName: {
                value: "",
                valid: "false",
                touched: "false",
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value, 
            this.state.controls.location.value,
            this.state.controls.image.value
        );
    }

    placeNameChangeHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        })
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickedHandler = (image) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                    <PickImage 
                        onImagePicked={this.imagePickedHandler}
                    />
                    <PickLocation 
                        onLocationPicked={this.locationPickedHandler}
                    />
                    <PlaceInput 
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangeHandler}
                    />
                    <View style={styles.button}>
                        <Button 
                            title="Share Place" 
                            onPress={this.placeAddedHandler}
                            disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid || !this.state.controls.image.valid}
                        />
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
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    };
};

export default connect(null, mapDispatchToProps)(Wrapper(SharePlaceScreen));
