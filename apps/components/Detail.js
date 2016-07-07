/**
 * Created by roger on 2016. 6. 28..
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Detail extends Component {
  render() {
    const { actions } = this.props;

    return (
        <View style={styles.container}>
          <Text onPress={actions.pop}>Go back!</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    alignItems : 'center',
    backgroundColor : '#F5FCFF',
    flex : 1,
    justifyContent : 'center'
  }
});