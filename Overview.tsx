import React from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View, TabBarIOS } from 'react-native';
import Branch, { BranchData } from './Branch';
import { Travis } from './Travis';
import Data from './Data';
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface OverviewState {
  title: string;
  data: any;
  refreshing: boolean;
  init: boolean;
  selectedTab: string;
}
/*
https://github.com/jondot/awesome-react-native
https://medium.com/@ste.grider/component-kits-for-react-native-84eff4b321b9
https://react.parts/
https://react.parts/
*/
export class Overview extends React.Component<any, OverviewState> {

  private travis = new Travis();

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    console.log('HERE - OPTIONS');
    console.log(params)

    return {
      title: 'Sea Eye',
    };
  };

  styles: any = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    list: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'stretch',
      marginBottom: 10
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      title: 'No Repository selected',
      data: [],
      refreshing: false,
      init: true,
      selectedTab: 'failed'
    };
    this.fethData();
  }

  fethData = () => {

    return Data.store.fetch().then(data => {
      this.setState({ data: data, init: false });
    }).catch(e => {
      console.log(e);
    });
  }

  refresh() {
    this.setState({ refreshing: true });
    this.fethData().then(() => {
      this.setState({ refreshing: false });
    })
  }

  setTab(tabId: string) {
    this.setState({ selectedTab: tabId });
  }

  applyFilter(data, state: sting) {
    let filtered;
    if (state === 'failed') {
      filtered = data.filter(item => !!item.last_build &&
        (item.last_build.state === 'failed' || item.last_build.state === 'canceled'));
    } else if (state === 'okay') {
      filtered = data.filter(item => !!item.last_build &&
        !(item.last_build.state === 'failed' || item.last_build.state === 'canceled'));
    } else {
      filtered = { ...data };
    }
    return filtered;
  }

  getData(state: string) {
    return this.applyFilter(this.state.data, state);
  }

  render() {
    return (
      <View style={this.styles.container}>

        <TabBarIOS style={{ alignSelf: 'stretch' }}>
          <Icon.TabBarItemIOS
            iconName="error-outline"
            title="Attention"
            selected={this.state.selectedTab === 'failed'}
            onPress={() => this.setTab('failed')}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
              data={this.getData('failed')}
              style={this.styles.list}
              renderItem={({ item }) =>
                <Branch navigation={this.props.navigation} branch={item} />
              } />
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="done"
            title="Okay"
            selected={this.state.selectedTab === 'okay'}
            onPress={() => this.setTab('okay')}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
              data={this.getData('okay')}
              style={this.styles.list}
              renderItem={({ item }) =>
                <Branch navigation={this.props.navigation} branch={item} />
              } />
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName="list"
            title="All"
            selected={this.state.selectedTab === 'all'}
            onPress={() => this.setTab('all')}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
              data={this.state.data}
              style={this.styles.list}
              renderItem={({ item }) =>
                <Branch navigation={this.props.navigation} branch={item} />
              } />
          </Icon.TabBarItemIOS>
        </TabBarIOS>
        {this.state.init && <View style={this.styles.loading}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        }
      </View>
    )
  };

}