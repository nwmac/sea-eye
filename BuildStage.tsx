import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from './Utils';
import Data from './Data';

export default class BuildStage extends React.Component<any, any> {

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
    }
  });

  render() {
    let { name, state, finished_at, started_at } = this.props.stage;
    const index = this.props.index;
    const color = Data.getBranchColor(state);
    const icon = Data.getBranchIcon(state)
    let status = state || '';
    status = status.toUpperCase();
    let duration = '-';
    if (started_at) {
      const f = finished_at ? moment(finished_at): moment();
      const s = moment(started_at);
      duration = moment.duration(f.diff(s)).humanize();
      duration = Utils.utils.formatDuration(moment.duration(f.diff(s)));
    }
    return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          marginBottom: 1,
          paddingHorizontal: 20,
          paddingVertical: 0
        }}>
          {(index > 0) && <View style={{
            borderLeftWidth: 1,
            marginLeft: 12,
            height: 20,
            borderColor: '#777',
            marginVertical: 4
          }}></View>}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={icon} size={24} color={color}/>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 10, alignItems: 'center' }}>
              <Text style={{ flex: 1, fontSize: 14 }}>{name}</Text>
              <Text style={{ fontSize: 12 }}>{duration}</Text>
            </View>
          </View>
        </View>
    )
  };

}
