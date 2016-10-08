import React, {Component} from 'react';

const URLs = {
  'reddit': 'https://www.reddit.com/.rss',
  'nytimes': 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  '538': 'http://fivethirtyeight.com/all/feed',
  'bbc': 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml?edition=int',
  'ap': 'http://hosted.ap.org/lineups/USHEADS-rss_2.0.xml?SITE=SCAND&SECTION=HOME',
  'npr': 'http://www.npr.org/rss/rss.php?id=1001',
  'espn': 'http://www.espn.com/espn/rss/news',
  'economist': 'http://www.economist.com/sections/international/rss.xml',
  'newyorker': 'http://www.newyorker.com/feed/everything',
  'hackernews': 'https://news.ycombinator.com/rss',
  'atlantic': 'http://www.theatlantic.com/feed/all/',
  'onion': 'http://www.theonion.com/feeds/rss',
  'pcmag': 'http://feeds.pcmag.com/Rss.aspx/SectionArticles?sectionId=1475',
  'lifehack': 'http://feeds.lifehack.org/Lifehack',
  'psychologytoday': 'https://www.psychologytoday.com/collections/feed',
  'mashable': 'http://feeds.mashable.com/Mashable',
  'forbes': 'http://www.forbes.com/most-popular/feed/',
  'wsj': 'http://online.wsj.com/xml/rss/3_7014.xml',
  'wired': 'https://www.wired.com/feed',
  'cnet': 'http://www.cnet.com/rss/news/',
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
          <img className="popup-icon" src='../../assets/img/nytimes.png' onClick={this.addFeed.bind(this, "nytimes")} />
          <img className="popup-icon" src='../../assets/img/npr.png' onClick={this.addFeed.bind(this, "npr")} />
          <img className="popup-icon" src='../../assets/img/bbc.png' onClick={this.addFeed.bind(this, "bbc")} />
          <img className="popup-icon" src='../../assets/img/ap.png' onClick={this.addFeed.bind(this, "ap")} />
          <img className="popup-icon" src='../../assets/img/538.png' onClick={this.addFeed.bind(this, "538")} />
          <img className="popup-icon" src='../../assets/img/economist.png' onClick={this.addFeed.bind(this, "economist")} />
          <img className="popup-icon" src='../../assets/img/atlantic.png' onClick={this.addFeed.bind(this, "atlantic")} />
          <img className="popup-icon" src='../../assets/img/newyorker.png' onClick={this.addFeed.bind(this, "newyorker")} />
          <img className="popup-icon" src='../../assets/img/forbes.png' onClick={this.addFeed.bind(this, "forbes")} />
          <img className="popup-icon" src='../../assets/img/wsj.png' onClick={this.addFeed.bind(this, "wsj")} />
          <img className="popup-icon" src='../../assets/img/pcmag.png' onClick={this.addFeed.bind(this, "pcmag")} />
          <img className="popup-icon" src='../../assets/img/reddit.png' onClick={this.addFeed.bind(this, "reddit")} />
          <img className="popup-icon" src='../../assets/img/hackernews.png' onClick={this.addFeed.bind(this, "hackernews")} />
          <img className="popup-icon" src='../../assets/img/onion.png' onClick={this.addFeed.bind(this, "onion")} />
          <img className="popup-icon" src='../../assets/img/wired.png' onClick={this.addFeed.bind(this, "wired")} />
          <img className="popup-icon" src='../../assets/img/espn.png' onClick={this.addFeed.bind(this, "espn")} />
          <img className="popup-icon" src='../../assets/img/cnet.png' onClick={this.addFeed.bind(this, "cnet")} />
          <img className="popup-icon" src='../../assets/img/mashable.png' onClick={this.addFeed.bind(this, "mashable")} />
          <img className="popup-icon" src='../../assets/img/lifehack.png' onClick={this.addFeed.bind(this, "lifehack")} />
          <img className="popup-icon" src='../../assets/img/psychologytoday.png' onClick={this.addFeed.bind(this, "psychologytoday")} />
        </div>
        <div className="new-feed">
          <img className="new-feed-img" src={'../../assets/img/add.png'} onClick={this.addFeed.bind(this, null)} />
          <input placeholder="Add Custom Feed Url" className="new-feed-input" type="text" onChange={this.updateState("url")} />
        </div>
      </div>
    );
  }
}

export default PopupRoot
