import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Data from './Data';
import Utils from './Utils';

export default class JenkinsBuildInfo extends React.Component<BranchProps, any> {

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
      paddingTop: 0

    },
    statusText: {
      flex: 1,
      fontSize: 12,
      paddingLeft: 4,
    }
  });

  branchColor(build) {
    const { state } = build;
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

  branchIcon(build) {
    const { state } = build;
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

  render() {
    const build = this.props.build;
    const name = build.fullDisplayName;
    var age = moment(build.timestamp).fromNow();
    const color = Data.getBranchColor(build.result, build);
    const icon = Data.getBranchIcon(build.result, build);
    const styles = this.styles;
    const duration = Utils.utils.formatDuration(moment.duration(build.duration));

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 1,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 12,
      }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon name={icon} size={30} color={color} />
          <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, flex: 1 }}>{name}</Text>
            </View>
            <View style={styles.status}>
            <Text style={{ flex: 1, fontSize: 12 }}>{age}</Text>
            <Text style={{ fontSize: 12 }}>{duration}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
}
