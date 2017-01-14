import React, {Component} from 'react';
import Switch from 'react-toggle-switch';

const URLs = {
  'reddit': 'https://www.reddit.com/.rss',
  'nytimes': 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  '538': 'http://fivethirtyeight.com/all/feed',
  'bbc': 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk',
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
      url: null,
      low_power_mode: false,
      selectedFeeds: [],
    };
    this.key = 0;
    this.addOrRemoveFeed = this.addOrRemoveFeed.bind(this);
    this.updateState = this.updateState.bind(this);
    this.togglePowerSave = this.togglePowerSave.bind(this);
    chrome.storage.sync.get('low_power_mode', obj => {
      if(obj) {
        this.setState({low_power_mode: obj.low_power_mode});
      }
    });
  }

  componentDidMount() {

    chrome.storage.sync.get('feeds', (feeds) => {
      if (feeds.feeds) {
        this.setState({selectedFeeds: feeds.feeds});
      } else {
        this.setState({selectedFeeds: []});
      }
    });
  }

  updateState (field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  togglePowerSave() {
    chrome.storage.sync.set({low_power_mode: !this.state.low_power_mode});
    this.setState({low_power_mode: !this.state.low_power_mode});
  }

   addOrRemoveFeed(source, e) {
    e.preventDefault();
    if(source) this.state.url = URLs[source];
    let feedsArr = [];
    chrome.storage.sync.get('feeds', feedsObj => {
      if(this.state.selectedFeeds.includes(this.state.url)) {
        feedsArr = feedsObj.feeds.filter(feed => {
          return(feed !== this.state.url);
        });
      } else {
        if(Object.keys(feedsObj).length > 0) {
          feedsArr = feedsObj.feeds;
          feedsArr.push(this.state.url);
        } else {
          feedsArr = [this.state.url];
        }
      }
      chrome.storage.sync.set({'feeds': feedsArr});
      this.setState({selectedFeeds: feedsArr});
    });
  }


  render() {
    return(
      <div className="popup-container">
        <div className="popup-icon-container">
          {Object.keys(URLs).map(source => {
            this.key ++;
            return (
            <div className="popup-icon-item-container"
              style={{background: this.state.selectedFeeds.includes(URLs[source]) ? '#f0f0f0' : 'white'}} key={this.key}>
              <img className="popup-icon" src={`../../assets/img/${source}.png`}
              onClick={this.addOrRemoveFeed.bind(this, source)} />
            </div>
            );
           }
          )
        }
        </div>
        <div className="new-feed">
          <img className="new-feed-img" src={'../../assets/img/add.png'} onClick={this.addOrRemoveFeed.bind(this, null)} />
          <input placeholder="Add Custom Feed Url" className="new-feed-input" type="text" onChange={this.updateState("url")} />
        </div>
        <div className="animation-switch">
          <p className="animation-text"
            style={{color: this.state.low_power_mode ? 'darkgrey' : '#2F4F4F'}}>Weather Animations</p>
          <Switch onClick={this.togglePowerSave} on={!this.state.low_power_mode}/>
        </div>
      </div>
    );
  }
}

export default PopupRoot;
