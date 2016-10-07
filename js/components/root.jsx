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
    this.totalRendered = 0;
    this.feeds = [];
  }

  componentDidMount() {
    chrome.storage.sync.get('feeds', (initFeedsObj) => {
      let initFeedsArr = initFeedsObj.feeds;
      let initFeeds = [];
      initFeedsArr.forEach(feed => {
        this.feeds.push(feed);
        initFeeds.push(<List key={this.key} id={this.key} delete={this.delete} url={feed} />);
        this.key++;
        this.setState({feedList: initFeeds});
      });
      
      setInterval(() => {
        chrome.storage.sync.get('feeds', (feedsObj) => {
          let feeds = this.state.feedList;
          let feedsArr = feedsObj.feeds;
          if (feedsArr.length > this.feeds.length) {
            let toAdd = feedsArr[feedsArr.length - 1];
            this.feeds.push(toAdd);
            feeds.push(<List key={this.key} id={this.key} delete={this.delete} url={toAdd} />);
            this.key++;
          }
          this.setState({feedList: feeds});
        });
      }, 50);
    });

    
  }

  delete(list) {
    this.state.feedList.splice(list.id, 1);
    this.feeds.splice(list.id, 1);
    this.key--;
    chrome.storage.sync.set({'feeds': this.feeds});
    this.forceUpdate();
  }


  updateState (field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render() {
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
