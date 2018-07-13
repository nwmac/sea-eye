import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Data from './Data';

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

  showBranchDetail = (branch: any) => {
    this.props.navigation.navigate(
      branch.job.type === 'travis' ? 'TravisDetail' : 'JenkinsDetail',
      {
        branch: branch
      }
    );
  }

  render() {
    let { name, last_build, repo } = this.props.branch;
    last_build = last_build || {};
    var age = last_build.finished_at ? moment(last_build.finished_at).fromNow() : 'now';
    const color = Data.getBranchColor(last_build.state);
    const icon = Data.getBranchColor(last_build.state)
    let status = last_build.state || '';
    status = status.toUpperCase();
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
