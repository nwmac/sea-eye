/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BranchDetail from './BranchDetail';
import Overview from './Overview';
import UrlView from './UrlView';
import JenkinsJobDetail from './JenkinsJobDetail';
//import { Navigation } from 'react-native-navigation';

// OAuth2
//https://medium.com/@jtremback/oauth-2-with-react-native-c3c7c64cbb6d

AppRegistry.registerComponent(appName, () => App);

// register all screens of the app (including internal ones)
// Navigation.registerComponent('main', () => Overview);
// Navigation.registerComponent('travis.detail', () => BranchDetail);
// Navigation.registerComponent('jenkins.detail', () => JenkinsJobDetail);
// Navigation.registerComponent('branch.view', () => UrlView);

// global.___DEV___ = false;

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'main',
//     title: 'Sea Eye',
//     navigatorStyle: {
//       navBarTextColor: '#ffffff',
//       navBarBackgroundColor: '#2d7eff',
//       navBarButtonColor: '#e0e0e0',
//     }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
//     navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
//   }
//});