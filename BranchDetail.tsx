import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Octicons';
import Data from './Data';
import Build from './Build';

export default class BranchDetail extends React.Component<any, any> {

  styles: any = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: params.branch.name,
    };
  };

  constructor(props: any) {
    super(props);
    this.state = {
      title: 'No Repository selected',
      data: {
        build: []
      },
      refreshing: false
    };
    this.fetchData();
  }

  fetchData() {
    const { navigation } = this.props;
    const branch = navigation.getParam('branch', {});
    const id = !!branch && branch.last_build ? branch.last_build.id : '';
    return Data.store.fetchBuild(branch.job, id).then(data => {
      this.setState({ data: data });
    })
      .catch(e => {
        console.log(e);
      });
  }

  showTravisDetail(navigation, branch) {
    const url = branch.job.webView + '/' + branch.repo + '/builds/' + branch.last_build.id;
    navigation.navigate('UrlView', {
      title: 'Travis Build: #' + branch.last_build.number,
      url: url
    });
  }

  render() {
    const { navigation } = this.props;
    const branch = navigation.getParam('branch', {});
    const { name, repo } = branch;
    const build = this.state.data || {};
    let message = build.commit && build.commit.message ? build.commit.message : '';
    message = message.split('\n')[0];
    const since = moment(build.started_at).fromNow();
    const commit = build.commit && build.commit.sha ? build.commit.sha.substr(0, 8) : '-';
    const commitSince = build.commit && build.commit.committed_at ? moment(build.commit.committed_at).fromNow() : '-';
    return (
      <View style={this.styles.container}>
        <TouchableOpacity style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }} onPress={() => this.showTravisDetail(navigation, branch)}>
          <View style={{ flexDirection: 'row', padding: 16 }}>
            <Icon name="mark-github" size={30} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ fontSize: 12 }}>{repo}</Text>
              <Text>{name}</Text>
              <Text style={{ fontSize: 12, paddingTop: 8 }}>Build #{build.number}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
                <Icon name="calendar" size={16}></Icon>
                <Text style={{ fontSize: 12, paddingLeft: 4 }}>{since}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
                <Icon name="git-commit" size={16}></Icon>
                <Text style={{ flex: 1, fontSize: 11, paddingLeft: 4 }}>{commit}</Text>
                <Text style={{ fontSize: 11, paddingLeft: 4 }}>{commitSince}</Text>
              </View>
              <Text style={{ fontSize: 11, paddingTop: 8 }}>{message}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#777"/>
          </View>
        </TouchableOpacity>
        <Build build={build} refresh={() => this.fetchData()} />
      </View>
    )
  };
}
