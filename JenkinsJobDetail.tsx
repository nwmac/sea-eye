import React from 'react';
import { AlertIOS, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import Icon from 'react-native-vector-icons/Octicons';
import Data from './Data';
import JenkinsBuilds from './JenkinsBuilds';

export default class JenkinsJobDetail extends React.Component<any, any> {

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
    const {id} = branch.last_build;
    console.log('Jenkins Job Detail');
    console.log(branch);
    console.log(id);
    // return Data.store.fetchBuild(this.props.branch.job, id).then(data => {
    //   this.setState({ data: data });
    // })
    // .catch(e => {
    //   console.log(e);
    // });
  }

  showJenkinsDetail() {
    console.log('SHOW JENKINS DETAIL');
  }

  render() {
    const { navigation } = this.props;
    const branch = navigation.getParam('branch', {});

    const { name, repo } = branch;
    const build = branch.last_build || {};
    console.log(build);
    let message = build.commit && build.commit.message ? build.commit.message : '';
    message = message.split('\n')[0];
    const since = moment(build.started_at).fromNow();
    return (
      <View style={this.styles.container}>
          <View style={{ flexDirection: 'row', borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          padding: 16 }}>
            <Icon name="tools" size={24} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ fontSize: 12 }}>{repo}</Text>
              <Text style={{ fontSize: 16 }}>{name}</Text>
              <Text style={{ fontSize: 12, paddingTop: 8 }}>Build #{build.number}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8}}>
                <Icon name="calendar" size={16}></Icon>
                <Text style={{ fontSize: 12, paddingLeft: 4 }}>{since}</Text>
              </View>
              <Text style={{ fontSize: 11, paddingTop: 8 }}>{message}</Text>
            </View>
          </View>
        <JenkinsBuilds job={branch} refresh={() => this.fetchData()}/>
      </View>
    )
  };
}

/*
            <Icon name="chevron-right" size={24} color="#777"/>

        <TouchableOpacity style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          padding: 16
        }} onPress={this.showJenkinsDetail.bind(this)}>
          </TouchableOpacity>
          </TouchableOpacity>

*/
