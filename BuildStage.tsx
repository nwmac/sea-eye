import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from './Utils';

export default class BuildStage extends React.Component<AnalyserNode, any> {

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

  branchColor(state) {
    switch (state) {
      case 'canceled':
        return '#777';
      case 'failed':
        return 'red'
      case 'passed':
        return 'green';
        case 'started':
        return '#2960c6';
      case 'created':
        return '#2960c6';
      default:
        return '#777';
    }
  }

  branchIcon(state) {
    switch (state) {
      case 'canceled':
        return 'do-not-disturb-on';
      case 'failed':
        return 'cancel'
      case 'passed':
        return 'check-circle';
      case 'created':
        return 'pause-circle-filled';
      case 'started':
        return 'play-circle-filled';
      default:
        return 'help';
    }
  }

  indicatorIcon(build) {
    const { state, previous_state } = build;
    let icon = 'sentiment-neutral';
    if (state === 'failed') {
      if (previous_state === 'passed') {
        icon = 'sentiment-dissatisfied';
      }
    } else if (state == 'passed') {
      if (previous_state === 'failed') {
        icon = 'sentiment-very-satisfied';
      } else {
        icon ='sentiment-satisfied';
      }
    }
    return icon;
  }

  render() {
    let { name, state, finished_at, started_at } = this.props.stage;
    const index = this.props.index;
    //var age = last_build.finished_at ? moment(last_build.finished_at).fromNow() : 'now';
    const color = this.branchColor(state)
    const icon = this.branchIcon(state)
    let status = state || '';
    status = status.toUpperCase();
    let duration = '-';
    if (started_at) {
      const f = finished_at ? moment(finished_at): moment();
      const s = moment(started_at);
      duration = moment.duration(f.diff(s)).humanize();
      duration = Utils.utils.formatDuration(moment.duration(f.diff(s)));
    }
    //const indicator = this.indicatorIcon(state);
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
