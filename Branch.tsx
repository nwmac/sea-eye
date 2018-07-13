import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BranchDetail from './BranchDetail';
import JenkinsJobDetail from './JenkinsJobDetail';

export interface BranchData {
  key: string;
  name: string;
  last_build: any;
  repo: string;
  noMoreDetail?: boolean;
}

export interface BranchProps {
  branch: BranchData;
  navigation: any;
}

export default class Branch extends React.Component<BranchProps, any> {

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
        icon = 'sentiment-satisfied';
      }
    }
    return icon;
  }

  showBranchDetail = (branch: any) => {
    console.log('showBranchDetail ');
    console.log(branch);

    this.props.navigation.navigate(
      branch.job.type === 'travis' ? 'TravisDetail' : 'JenkinsDetail',
      {
        branch: branch
      }
    );

    // this.props.navigator.push({
    //   component: branch.job.type === 'travis' ? BranchDetail : JenkinsJobDetail,
    //   title: branch.name,
    //   passProps: {
    //     branch: branch
    //   }
    // });
  }

  render() {
    console.log('render');
    let { name, last_build, repo } = this.props.branch;
    last_build = last_build || {};
    var age = last_build.finished_at ? moment(last_build.finished_at).fromNow() : 'now';
    const color = this.branchColor(last_build)
    const icon = this.branchIcon(last_build)
    let status = last_build.state || '';
    status = status.toUpperCase();
    const indicator = this.indicatorIcon(last_build);
    const canDrillDown = !this.props.branch.noMoreDetail;
    const styles = this.styles;

    function cardInfo() {
      return (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 1,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            padding: 16,
          }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon name={icon} size={30} color={color} />
              <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 10 }}>
                <Text style={{ fontSize: 12, paddingBottom: 2 }}>{repo}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, flex: 1 }}>{name}</Text>
                  {canDrillDown &&<Icon name="keyboard-arrow-right" size={22} color="#777" />}
                </View>
                <View style={styles.status}>
                  <Text style={{ fontSize: 12 }}>{age}</Text>
                </View>
              </View>
            </View>
          </View>
      );
    }
    return (
      <View>
      {!!canDrillDown && <TouchableOpacity onPress={this.showBranchDetail.bind(this, this.props.branch)}>
      {cardInfo()}
      </TouchableOpacity>
      }
      {!canDrillDown && cardInfo()}
      </View>
    )
  };

}
