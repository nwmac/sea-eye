import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TestPage extends React.Component<any, any> {

  render() {
    const { navigation } = this.props;
    const branch = navigation.getParam('branch', 'NO-ID');
    console.log(branch)
    return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      marginBottom: 1,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      padding: 16,
    }}>
      <Text>TEST</Text>
    </View>
    );
  }
}
