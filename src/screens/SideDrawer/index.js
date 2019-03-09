import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
    componentWillUnmount() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: false
                }
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.drawerItem}>
                        <Icon name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size={30} color="#aaa" style={styles.drawerItemIcon}/>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 22
    },
    drawerItemIcon: {
        marginRight: 10
    }
})

export default SideDrawer;
