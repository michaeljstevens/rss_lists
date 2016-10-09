import React, {Component} from 'react';
import List from './list.jsx';



class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feedUrl: null,
      feedList: [],
      modalOpen: false,
      background: "",
      customBackground: "",
      modalBackground: "",
      modalZIndex: 0,
    };
    this.updateState = this.updateState.bind(this);
    this.delete = this.delete.bind(this);
    this.key = 0;
    this.totalRendered = 0;
    this.feeds = [];
    this.showModal = this.showModal.bind(this);
    this.customBackground = this.customBackground.bind(this);

    chrome.storage.sync.get('background', (backgroundObj) => {
      if(Object.keys(backgroundObj).length < 1) {
        chrome.storage.sync.set({'background': "url('../../assets/img/backgrounds/trees.jpeg')"});
        this.setState({background: "url('../../assets/img/backgrounds/trees.jpeg')"});
      } else {
        this.setState({background: backgroundObj.background});
      }
    });

    this.modal = (
        <div className="modal-container">
          <div className="modal-image-container">
            <img className="modal-img" onClick={this.changeBackground.bind(this, "url('../../assets/img/backgrounds/trees.jpeg')")}
            src="../../assets/img/backgrounds/trees.jpeg" />
            <img onClick={this.changeBackground.bind(this, "url('../../assets/img/backgrounds/coffee.jpeg')")}
            className="modal-img" src="../../assets/img/backgrounds/coffee.jpeg" />
            <img className="modal-img" onClick={this.changeBackground.bind(this, "url('../../assets/img/backgrounds/wall.jpeg')")}
            src="../../assets/img/backgrounds/wall.jpeg" />
            <img className="modal-img" onClick={this.changeBackground.bind(this, "url('../../assets/img/backgrounds/mountain.jpeg')")}
            src="../../assets/img/backgrounds/mountain.jpeg" />
          </div>
          <div className="background-input">
            <img className="custom-image-button" src={'../../assets/img/add.png'} onClick={this.customBackground} />
            <input className="custom-image-input" type="text" onChange={this.updateState("customBackground")} placeholder="Custom Image Url" />
          </div>
        </div>
      );
  }

  componentDidMount() {
    chrome.storage.sync.get('feeds', (initFeedsObj) => {
      let initFeedsArr = initFeedsObj.feeds;
      let initFeeds = [];
      initFeedsArr.forEach(feed => {
        this.feeds.push({'url': feed, 'id': this.key});
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
            this.feeds.push({'url': toAdd, 'id': this.key});
            feeds.push(<List key={this.key} id={this.key} delete={this.delete} url={toAdd} />);
            this.key++;
          }
          this.setState({feedList: feeds});
        });
      }, 50);
    });

    
  }

  customBackground(e) {
    e.preventDefault();
    let customUrl = `url('${this.state.customBackground}')`;
    chrome.storage.sync.set({'background': customUrl});
    this.setState({background: customUrl});
    this.showModal();
  }

  changeBackground(source, e) {
    e.preventDefault();
    chrome.storage.sync.set({'background': source});
    this.setState({background: source});
    this.showModal();
  }

  delete(list) {
    this.state.feedList = this.state.feedList.filter(feed => {
      return feed.props.id !== list.id;
    });
    this.feeds = this.feeds.filter(feed => {
      return feed.id !== list.id;
    });
    let urls = this.feeds.map(feed => {
      return feed.url;
    });
    this.key--;
    chrome.storage.sync.set({'feeds': urls});
    this.forceUpdate();
  }


  updateState (field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  showModal() {
    if(this.state.modalOpen) {
      this.setState({modalOpen: false, modalBackground: '', modalZIndex: 0});
    } else {
      this.setState({modalOpen: true, modalBackground: 'rgba(0,0,0,0.8)', modalZIndex:100});
    }
  }

  render() {
    return(
      <div className="outer-container" style={{backgroundImage: this.state.background}}>
        <button onClick={this.showModal} className="background-button">Change Background Image</button>
        <div className="modal-outer-container" style={{background: this.state.modalBackground, zIndex: this.state.modalZIndex}}>
          {this.state.modalOpen ? this.modal : null}
        </div>
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
    marginTop: 100,
  },
};


export default Root;
