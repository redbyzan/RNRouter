import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    actions as routerActions,
    NavBar,
    Route,
    Router,
    Schema,
    TabBar,
    TabRoute
} from 'react-native-router-redux';
import {
    setSearchKeyword,
    runSearch,
    moreVideos,
    newSearch,
    changeDefaultSchema
} from './actions';
import {
    signIn,
    setUsername,
    setPassword,
    loginEnd
} from './actions/UserAction'

import Detail from './components/Detail';
import Master from './components/Master';
import SignIn from './components/SignIn';
import Search from './components/search';
import SearchResult from './components/search_result';


const mapStateToProps = state => {
  return {
    router: state.router,
    search: state.search,
    User: state.User
  };
};


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...routerActions,
    setSearchKeyword,
    runSearch,
    moreVideos,
    newSearch,
    changeDefaultSchema,
    signIn,
    setUsername,
    setPassword,
    loginEnd,
  }, dispatch),
  dispatch,
});

const assets = {
  'calendar': require('./assets/thin-0021_calendar_month_day_planner.png'),
  'home': require('./assets/thin-0046_home_house.png'),
  'logo': require('./assets/qwikly.png'),
  'profile': require('./assets/thin-0091_file_profile_user_personal.png'),
  'video': require('./assets/thin-0592_tv_televison_movie_news.png'),
  'youtube': require('./assets/youtube-logo.png'),
};


const defaultSchema = {
  navBar: NavBar,
  navLeftTitle: "more",
  navLeftColor: '#FFF',
  navRightTitle: 'serverTime\nUTC : 09:09:21',
  navRightStyle : {

  },
  navTint: '#224655',
  navTitleColor: '#FFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18,
    alignSelf : 'left',
    justifyContent : 'left'
  },
  navTitleAlign : 'left',
  statusStyle: 'light-content',
  tabBar: TabBar,
};

class App extends Component {
  render() {

    let initPageName = "signIn";

    const { actions } = this.props;

    return (
        <Router {...this.props} assets={assets} initial={`${initPageName}`}>
          <Schema name="default" {...defaultSchema} />

          <Route name="signIn" component={SignIn} type="reset" hideNavBar={true}/>
          <Route name="master" component={Master('#111')} title="Home"/>
          <Route name="detail" component={Detail} title="Detail" navLeftTitle="back" navLeftHandler={actions.pop}/>
          <Route name="searchResult" component={SearchResult}/>

          <TabRoute name="tabBar" barTint="#FFF" tint="#32DEAF">
            <Route name="tab1" component={Master('#111')} title="TRANSACTION"
                   tabItem={{icon : assets.home, title : 'Home'}}/>

            <Route name="tab2" component={Master('#222')} title="Calendar"
                   tabItem={{icon : assets.calendar, title : 'Calendar'}}/>

            <Route name="tab3" component={Search} title="Video" tabItem={{icon : assets.video, title : 'Video'}}/>

            <Route name="tab4" component={Master('#444')} title="Profile"
                   tabItem={{icon : assets.profile, title : 'Profile'}}/>

            <Route name="tab5" component={Master('#555')} title="Chatting"
                   tabItem={{icon : assets.profile, title : 'Chatting'}}/>
          </TabRoute>
        </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
