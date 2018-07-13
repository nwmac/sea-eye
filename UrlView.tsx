import React from 'react';
import { ActivityIndicator, AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity, WebView } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UrlView extends React.Component<any, any> {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const title = navigation.getParam('title', 'Web View');
    return {
      title
    };
  };

  styles: any = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },    
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('url', '');
    console.log(url);
    return (
      <WebView
        style={this.styles.container}
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={() => {
          return (<View style={this.styles.loading}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
          );
        }}
        />
      );
    }
  }
