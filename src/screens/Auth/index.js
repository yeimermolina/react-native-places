import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import Background from '../../assets/background.jpg';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render () {
    let headingText = null;

    if (Dimensions.get('window').height > 500) {
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
            />
            <View style={styles.passwordContainer}>
              <View style={styles.passwordWrapper}>
                <DefaultInput 
                  placeholder="Password"
                  style={styles.input}
                />
              </View>
              <View style={styles.passwordWrapper}>
                <DefaultInput 
                  placeholder="Confirm Password"
                  style={styles.input}
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
  passwordContainer: {
    flexDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
    justifyContent: 'space-between'
  },
  passwordWrapper: {
    width: Dimensions.get('window').height > 500 ? '100%' : '45%'
  }
})

export default AuthScreen;
