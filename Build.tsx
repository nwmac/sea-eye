import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BuildStage from './BuildStage';

export default class Build extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      title: 'No Repository selected',
      data: this.props.build,
      refreshing: false,
      init: true,
    };
  }  

  styles: any = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    status: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 8

    },
    statusText: {
      flex: 1,
      fontSize: 12,
      paddingLeft: 4,
    },
    list: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'stretch',
    }
  });

  render() {
    let stages = this.props.build.stages || [];
    stages = stages.sort((a, b)=> a.number > b.number);
    return (
      <View style={this.styles.list}>
        <Text style={{ fontSize: 12, paddingTop: 20, paddingLeft: 14, paddingBottom: 16 }}>BUILD STAGES</Text>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={() => this.props.refresh()}
          data={stages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) =>
          <BuildStage job={this.props.build.job} stage={item} index={index}></BuildStage>
          } />
          </View>

    )
  };

}
