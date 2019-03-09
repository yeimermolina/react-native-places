import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ]).then(sources => {
          Navigation.setRoot({
            root: {
              sideMenu: {
                left: {
                  component: {
                    name: 'awesome-places.SideDrawerScreen',
                  }
                },
                center: {
                  bottomTabs: {
                    id: 'tabs',
                    options: {
                      topbar: {
                        visible: true,
                      }
                    },
                    children: [
                      {
                        stack: {
                          id: 'tab1',
                          children: [
                            {
                              component: {
                                name: 'awesome-places.FindPlaceScreen',
                                options: {
                                    topBar: {
                                        title: {
                                            text: 'Places'
                                        },
                                        leftButtons: [
                                            {
                                            id: 'nav_user_btn',
                                            icon: sources[2],
                                            color: 'white',
                                            title: 'Menu'
                                            }
                                        ]
                                  },
                                  bottomTab: {
                                    fontSize: 12,
                                    text: 'Places',
                                    icon: sources[0],
                                  }
                                }
                              },
                            },
                          ]
                        }
                      },
                      {
                        stack: {
                          id: 'tab2',
                          children: [
                            {
                              component: {
                                name: 'awesome-places.SharePlaceScreen',
                                options: {
                                  topBar: {
                                    title: {
                                        text: 'Share Place'
                                    },
                                    leftButtons: [
                                        {
                                        id: 'nav_user_btn',
                                        icon: sources[2],
                                        color: 'white',
                                        title: 'Menu'
                                        }
                                    ]
                                },
                                  bottomTab: {
                                    id: 'share',
                                    text: 'Share',
                                    fontSize: 12,
                                    icon: sources[1],
                                  }
                                }
                              },
                            },
                          ]
                        }
                      },
                    ],
                  },
                }
              }
            }
          });



    });
    
    
    
}

export default startTabs;
