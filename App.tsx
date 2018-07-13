/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import { Overview } from './Overview';
import { createStackNavigator } from 'react-navigation';
import JenkinsJobDetail from './JenkinsJobDetail';
import TestPage from './TestPage';
import BranchDetail from './BranchDetail';
import UrlView from './UrlView';

const RootStack = createStackNavigator({
  Home: Overview,
  TravisDetail: BranchDetail,
  JenkinsDetail: JenkinsJobDetail,
  Test: TestPage,
  UrlView: UrlView,
},
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2d7eff'
      },
      headerTintColor: '#fff'
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <NavigatorIOS
//         initialRoute={{
//           component: Overview,
//           title: 'Sea Eye',
//         }}
//         style={styles.container}
//       />
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'space-between',
    //: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
