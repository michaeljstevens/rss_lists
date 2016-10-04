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
  }

  addFeed(e) {
    e.preventDefault();
    const feeds = this.state.feedList;
    feeds.push(<List url={this.state.feedUrl} />);
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
    feeds.push(<List url='https://www.reddit.com/.rss' />);
    this.setState({feedList: feeds});
  }

  addnytimes(e) {
    e.preventDefault();
    const feeds = this.state.feedList;
    feeds.push(<List url='http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' />);
    this.setState({feedList: feeds});
  }

  render() {

    return(
      <div>
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
    overflow: 'scroll',
  }
};


export default Root;
