/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src'; //Pega o index.js por default
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
