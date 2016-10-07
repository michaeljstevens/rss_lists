import React, {Component} from 'react';

const URLs = {
  'reddit': 'https://www.reddit.com/.rss',
  'nytimes': 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  '538': 'http://fivethirtyeight.com/all/feed',
  'bbc': 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml?edition=int'
};

class PopupRoot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null
    };
    this.addFeed = this.addFeed.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState (field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

   addFeed(source, e) {
    e.preventDefault();
    if(source) this.state.url = URLs[source];
    chrome.storage.sync.get('feeds', feedsObj => {
      let feedsArr = feedsObj.feeds;
      feedsArr.push(this.state.url);
      chrome.storage.sync.set({'feeds': feedsArr});
    });
  }

  render() {
    return(
      <div className="popup-container">
        <div className="popup-icon-container">
          <img className="popup-icon" src='../../assets/img/reddit.jpg' onClick={this.addFeed.bind(this, "reddit")} />
          <img className="popup-icon" src='../../assets/img/nytimes.jpg' onClick={this.addFeed.bind(this, "nytimes")} />
          <img className="popup-icon" src='../../assets/img/538.png' onClick={this.addFeed.bind(this, "538")} />
          <img className="popup-icon" src='../../assets/img/bbc.png' onClick={this.addFeed.bind(this, "bbc")} />
        </div>
        <button onClick={this.addFeed.bind(this, null)}>Add Feed</button>
        <input type="text" onChange={this.updateState("url")} />
      </div>
    );
  }
}

export default PopupRoot
