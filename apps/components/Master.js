/**
 * Created by roger on 2016. 6. 28..
 */
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

const Master = (backgroundColor = '#F5FCFF') => class extends Component {

  constructor(props) {
    super(props);
console.log("Master componentDidUpdate");

    const { actions } = this.props;

  }

  render() {

    const { actions, assets } = this.props;


    return (
        <View style={[styles.container, { backgroundColor }]}>
          <TouchableHighlight ref="touch" onPress={actions.routes.detail()}>
            <Image style={styles.image} source={assets.logo}/>
          </TouchableHighlight>
          <Text style={styles.text} onPress={actions.routes.detail()}>Push detail view</Text>
        </View>
    );
  }
};

export default Master;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 200
  },
  text: {
    color: '#FFF'
  }
});