import React, {Component} from 'react';
import List from './list.jsx';

class Root extends Component {

  constructor(props) {
    super(props);
    this.addFeed = this.addFeed.bind(this);
    this.state = {
      feedUrl: null,
      feedList: []
    };
    this.updateState = this.updateState.bind(this);
    this.addReddit = this.addReddit.bind(this);
    this.addnytimes = this.addnytimes.bind(this);
    this.delete = this.delete.bind(this);
    this.key = 0;
  }

  componentDidMount() {
    let feeds = [];
    chrome.storage.sync.get('feeds', (feedsObj) => {
      let feedsArr = feedsObj.feeds;
      feedsArr.forEach(feed => {
        feeds.push(<List key={this.key} id={this.key} delete={this.delete} url={feed.props.url} />);
        this.key ++;
      });
      this.setState({feedList: feeds});
    });
  }

  delete(key) {
    let feeds = this.state.feedList;
    feeds = feeds.filter(feed => {
      return(parseInt(feed.key) !== key);
    });
    this.key --;
    chrome.storage.sync.set({'feeds': feeds});
    this.setState({feedList: feeds});
  }

  addFeed(e) {
    e.preventDefault();
    const feeds = this.state.feedList;
    feeds.push(<List url={this.state.feedUrl} id={this.key} key={this.key} delete={this.delete} />);
    this.key ++;
    chrome.storage.sync.set({'feeds': feeds})
    this.setState({feedList: feeds});
  }

  updateState (field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  addReddit(e) {
    e.preventDefault();
    const feeds = this.state.feedList;
    feeds.push(<List url='https://www.reddit.com/.rss' id={this.key} key={this.key} delete={this.delete} />);
    this.key ++;
    chrome.storage.sync.set({'feeds': feeds});
    this.setState({feedList: feeds});
  }

  addnytimes(e) {
    e.preventDefault();
    const feeds = this.state.feedList;
    feeds.push(<List url='http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' id={this.key} key={this.key} delete={this.delete} />);
    this.key ++;
    chrome.storage.sync.set({'feeds': feeds});
    this.setState({feedList: feeds});
  }

  render() {

    return(
      <div style={styles.outerContainer}>
        <input type="text" value={this.state.feedUrl} onChange={this.updateState("feedUrl")} />
        <button style={styles.button} onClick={this.addFeed}>Add Feed</button>
        <button style={styles.button} onClick={this.addReddit}>Add Reddit</button>
        <button style={styles.button} onClick={this.addnytimes}>Add NYTIMES</button>
        <div style={styles.container}>
          {this.state.feedList}
        </div>
      </div>
    );
  }
}

const styles = {
  button: {

  },
  container: {
    display: 'flex',
    alignItems: 'center',
    height: "100%",
  },
  outerContainer: {
    height: '100%',
  }
};


export default Root;
