import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import JenkinsBuildInfo from './JenkinsBuildInfo';

export default class JenkinsBuilds extends React.Component<any, any> {

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
    console.log('Jenkins Builds');
    console.log(this.props.job);
    let builds = this.props.job.jenkins.builds || [];
    // Restict to last 10 builds
    builds = builds.slice(1, 10);
    return (
      <View>
        <Text style={{ fontSize: 12, paddingTop: 20, paddingLeft: 14, paddingBottom: 20 }}>RECENT BUILDS</Text>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={() => this.props.refresh()}
          data={builds}
          keyExtractor={item => item.id.toString()}
          //style={this.styles.list}
          renderItem={({ item, index }) =>
            <JenkinsBuildInfo job={this.props.job} build={item} index={index}></JenkinsBuildInfo>
          } />
      </View>
    )
  };

}
