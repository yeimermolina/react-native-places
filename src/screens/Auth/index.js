import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import Background from '../../assets/background.jpg';

import validate from '../../utility/validation';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        }
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        }
      }
    }
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  loginHandler = () => {
    startMainTabs();
  }

  updateInputState = (key, value) => {
    let connectedValue = {};

    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const  equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }

    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }


    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue)
          }
        }
      }
    })
  }

  render () {
    const { controls } = this.state;
    let headingText = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    return(
      <View style={styles.container}>
        <ImageBackground source={Background} style={styles.backgroundImage}>
          {headingText}
          <ButtonWithBackground onPress={this.loginHandler} color="#29aaf4">Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput 
              placeholder="Your E-mail Address"
              style={styles.input}
              value={controls.email.value}
              onChangeText={(val) => this.updateInputState('email', val)}
            />
            <View 
              style={
                this.state.viewMode === 'portrait' 
                  ? styles.portraitPasswordContainer 
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === 'portrait' 
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput 
                  placeholder="Password"
                  style={styles.input}
                  value={controls.password.value}
                  onChangeText={(val) => this.updateInputState('password', val)}
                />
              </View>
              <View 
                style={
                  this.state.viewMode === 'portrait' 
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput 
                  placeholder="Confirm Password"
                  style={styles.input}
                  value={controls.confirmPassword.value}
                  onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                />
              </View>
              
              
            </View>
          </View>
          <ButtonWithBackground onPress={this.loginHandler} color="#29aaf4">SUBMIT</ButtonWithBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
})

export default AuthScreen;
