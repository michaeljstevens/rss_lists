import React, {Component} from 'react';
import List from './list.jsx';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feedUrl: null,
      feedList: [],
    };
    this.updateState = this.updateState.bind(this);
    this.delete = this.delete.bind(this);
    this.key = 0;
    this.feeds = [];
  }

  componentDidMount() {
    setInterval(() => {
      chrome.storage.sync.get('feeds', (feedsObj) => {
        let feeds = [];
        let feedsArr = feedsObj.feeds;
        if (this.feeds.length !== feedsArr.length) {
          this.feeds = feedsArr;
          this.key = 0;
          feedsArr.forEach(feed => {
            feeds.push(<List key={this.key} id={this.key} delete={this.delete} url={feed} />);
            this.key++;
          });
          this.setState({feedList: feeds});
        }
      });
    }, 50);
  }

  delete(list) {
    let newFeeds = [];
    this.feeds.forEach(feed => {
      newFeeds.push(feed);
    });
    newFeeds.splice(list.id, 1);
    chrome.storage.sync.set({'feeds': newFeeds});
  }


  updateState (field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render() {
    debugger
    return(
      <div className="outer-container">
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
};


export default Root;
