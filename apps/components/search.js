/**
 * Created by roger on 2016. 6. 27..
 */
import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { runSearch } from '../actions';
import Events from 'react-native-simple-events';
import SearchResult from './search_result';

class Search extends React.Component {
  handleKeywordChange(event) {
    this.props.actions.setSearchKeyword(event.nativeEvent.text.trim());
  }

  handleSubmit(event) {
    this.props.actions.runSearch(this.props.search.keyword);
  }

  render() {
    const { actions, assets, search } = this.props;

    if ( search.isViewingResult ) {
      console.log("SearchResult ", this.props);
//      actions.push({title : 'result', component : SearchResult});
//        actions.push;
      return (
          <View style={styles.scene}>
            <SearchResult
                isSearching={search.isSearching}
                keyword={search.keyword}
                result={search.result}
                moreVideos={actions.moreVideos}
            />
          </View>
      )
    }

    return (
        <View style={styles.container}>
          <Image
              style={styles.logo}
              source={assets.youtube}/>
          {
            search.isSearching ?
                <ActivityIndicator
                    style={styles.preloader}
                    animating={search.isSearching}
                    color="#111"
                    size="large"/> :
                <TextInput
                    style={styles.searchInput}
                    value={search.keyword}
                    onChange={this.handleKeywordChange.bind(this)}
                    onSubmitEditing={this.handleSubmit.bind(this)}
                    placeholder="Search for videos"/>
          }
          <Text onPress={actions.routes.searchResult()}>Go to Result</Text>
          {search.error ? <Text style={styles.error}>{search.error}</Text> : null}
          <Text style={styles.info}><Text style={{fontWeight: 'bold'}}>extPlaylist</Text> lets you search for youtube
            videos and create playlist outside of youtube in 3 easy steps:</Text>
          <Text style={styles.step}>1. Search for videos</Text>
          <Text style={styles.step}>2. Add to existing or new playlist</Text>
          <Text style={styles.step}>3. Enjoy your playlist!</Text>
        </View>
    );
  }
}

//Search.propTypes = {
//  error: React.PropTypes.string.isRequired,
//  keyword: React.PropTypes.string.isRequired,
//  isSearching: React.PropTypes.bool.isRequired,
//  setSearchKeyword: React.PropTypes.func.isRequired,
//  runSearch: React.PropTypes.func.isRequired,
//};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F1F1F1',
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  logo: {
    width: 250,
    height: 150,
    alignSelf: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    marginBottom: 20
  },
  info: {
    marginBottom: 10
  },
  step: {
    marginBottom: 5
  },
  preloader: {
    marginBottom: 20
  },
  error: {
    fontSize: 15,
    color: 'red',
    marginBottom: 20,
    alignSelf: 'center'
  },
  scene: {
    flex: 1,
  }
});

export default Search;