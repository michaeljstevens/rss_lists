import React, {Component} from 'react';
import List from './list.jsx';
import Weather from './weather.jsx';
import Notepad from './notepad.jsx';
import {ChromePicker} from 'react-color';
import $ from 'jQuery';



class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feedUrl: null,
      feedList: [],
      modalOpen: false,
      background: "",
      customBackground: "",
      displayColorPicker: false,
      infoColor: "",
    };
    this.updateState = this.updateState.bind(this);
    this.delete = this.delete.bind(this);
    this.key = 0;
    this.totalRendered = 0;
    this.feeds = [];
    this.showModal = this.showModal.bind(this);
    this.customBackground = this.customBackground.bind(this);
    this.displayColorPicker = this.displayColorPicker.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeInfoColor = this.changeInfoColor.bind(this);
    this.formatDate = this.formatDate.bind(this);

    chrome.storage.sync.get('background', (backgroundObj) => {
      if(Object.keys(backgroundObj).length < 1) {
        chrome.storage.sync.set({'background': "url('../../assets/img/backgrounds/trees.jpeg')"});
        this.setState({background: "url('../../assets/img/backgrounds/trees.jpeg')"});
      } else {
        this.setState({background: backgroundObj.background});
      }
    });

    chrome.storage.sync.get('infoColor', (color) => {
      if (Object.keys(color).length < 1) {
        let newColor = 'rgba(17,39,93,0.94)';
        chrome.storage.sync.set({infoColor: newColor});
        this.setState({infoColor: newColor});
      } else {
        this.setState({infoColor: color.infoColor});
      }
    });

    this.modal = (
        <div id="modal-outer-container" className="modal-outer-container" style={{background: 'rgba(0,0,0,0.8)', zIndex: 100}}>
          <div id="modal-container" className="modal-container">
            <img src='../../assets/img/ic_close_black_24dp_1x.png' onClick={this.showModal} className="exit-modal" />
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
              <input className="custom-image-input" type="text" onChange={this.updateState("customBackground")} placeholder="Custom Background Url" />
            </div>
          </div>
        </div>
      );
  }

  componentDidMount() {
    chrome.storage.sync.get('feeds', (initFeedsObj) => {
      if (Object.keys(initFeedsObj).length > 0) {
        let initFeedsArr = initFeedsObj.feeds;
        let initFeeds = [];
        initFeedsArr.forEach(feed => {
          this.feeds.push({'url': feed, 'id': this.key});
          initFeeds.push(<List key={this.key} id={this.key} delete={this.delete} url={feed} />);
          this.key++;
          this.setState({feedList: initFeeds});
        });
      }

      setInterval(() => {
        chrome.storage.sync.get('feeds', (feedsObj) => {
          if(Object.keys(feedsObj).length > 0) {
            let feeds = this.state.feedList;
            let feedsArr = feedsObj.feeds;
            if (feedsArr.length > this.feeds.length) {
              let toAdd = feedsArr[feedsArr.length - 1];
              this.feeds.push({'url': toAdd, 'id': this.key});
              feeds.push(<List key={this.key} id={this.key} delete={this.delete} url={toAdd} />);
              this.key++;
              this.setState({feedList: feeds});
            }
          }
        });
      }, 50);
    });
  }

  componentDidUpdate() {

    let action = (event) => {
      if(!$(event.target).closest('#modal-container').length) {
          this.showModal();
      }
    }
    if(this.state.modalOpen) {
      document.getElementById('modal-outer-container').addEventListener('click', action.bind(this));
    }
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
      this.setState({modalOpen: false});
    } else {
      this.setState({modalOpen: true});
    }
  }

  displayColorPicker() {
    this.setState({displayColorPicker: true});
  }

  handleClose() {
    this.setState({displayColorPicker: false});
  }

  changeInfoColor(color) {
    let newColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    chrome.storage.sync.set({'infoColor': newColor});
    this.setState({infoColor: newColor});
  }

  formatDate() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August',
    'September','October','November','December'];
    let date = new Date();
    return(`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`);
  }

  render() {
    return(
      <div className="outer-container" style={{backgroundImage: this.state.background}}>
        {this.state.modalOpen ? this.modal : null}
        <div style={styles.container}>
          <div className="info-container" style={{background: this.state.infoColor}}>
            <h1 className="date">{this.formatDate()}</h1>
            <Weather />
            <Notepad />
            <div className="bottom-icons">
              <img src={'../../assets/img/color_picker.png'} onClick={this.displayColorPicker}
              className="color-picker-icon"/>
              {this.state.displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.handleClose }/>
                <ChromePicker color={this.state.infoColor} onChange={this.changeInfoColor} />
              </div> : null }
              <div>
                <img src="../../assets/img/background_icon.png" className="background-button" onClick={this.showModal} />
              </div>
              <a href="https://github.com/michaeljstevens/rss_lists">
                <img src="../../assets/img/github-icon.png" className="github-icon" />
              </a>
            </div>
          </div>
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
  popover: {
    position: 'absolute',
    zIndex: '2000',
    bottom: 63,
    left: 6,
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
};


export default Root;
