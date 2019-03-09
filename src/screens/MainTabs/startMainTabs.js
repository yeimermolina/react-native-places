import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#039893'
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
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    }
  });

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30),
        Icon.getImageSource("ios-menu", 30)
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
