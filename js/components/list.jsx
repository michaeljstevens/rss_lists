import React, {Component} from 'react';
import {ResizableBox} from 'react-resizable';
import $ from 'jQuery';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      showSpinner: true
    };
    this.key = 0;
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {

    const success = (data) => {
      this.setState({data: data, showSpinner: false});
    };

    const error = (e) => {
      console.log(e);
    };


    $.ajax({
      type: 'GET',
      url: `${this.props.url}`,
      success: success,
      error
    });
  }

  delete(e) {
    e.preventDefault();
    this.props.delete(this.props);
  }

  render() {
    let fpLis = [];
    if(this.state.data) {
      this.listImg = Array.from(this.state.data.getElementsByTagName("img"));
      if (this.listImg.length < 1) {
        let image = Array.from(this.state.data.getElementsByTagName("image"));
          if(image.length > 0) {
            let imgRegex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*.(jpg|jpeg|png|gif))/gi;
            this.listImg = imgRegex.exec(image[0].innerHTML)[0];
          } else {
            this.listImg = null;
          }
      }
      this.listTitle = Array.from(this.state.data.getElementsByTagName("title"))[0].innerHTML;
      let entries = Array.from(this.state.data.getElementsByTagName("entry"));
      let items = Array.from(this.state.data.getElementsByTagName("item"));


      let toAdd = entries.length > 0 ? entries : items;

      toAdd.forEach(item => {
        let title = item.getElementsByTagName("title")[0].innerHTML;
        title = title.replace("<![CDATA[","");
        title = title.replace("]]>","");
        let link = item.getElementsByTagName("link");
        let img = null;
        let content = item.getElementsByTagName("content");
        if(content[0]) {
          img = content[0].getAttribute("url");
          if(!img && content[0]) {
            let regex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
            let match = regex.exec(content[0].innerHTML);
            if(match) img = match[0];
          }
        } else {
          let description = item.getElementsByTagName("description");
          if(description[0] && !img) {
            let regex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*.(jpg|jpeg|png|gif))/gi;
            let match = regex.exec(description[0].innerHTML);
            if(match) img = match[0];
          }
        }

        if(!img) {
          let thumbnail = Array.from(item.getElementsByTagName("thumbnail"));
          if(thumbnail[0]) {
            img = thumbnail[0].getAttribute("url");
          }
        }
        
        link = link[0].innerHTML ? link[0].innerHTML : link[0].getAttribute("href");
        fpLis.push(<a key={this.key} href={link}><li className="outerLink" style={styles.item}>
        <img src={img ? img : '../../assets/img/no_img.png'} style={styles.image}></img>{title}</li></a>);
        this.key++;
      });
    }
    return (
      <div className="list" style={{background: this.state.showSpinner ? 'rgba(0,0,0,0.5)' : 'white'}}>
        <div className="list-header" style={{background: this.state.showSpinner ? 'rgba(0,0,0,0.0)' : '#f0f0f0'}}>
          {this.listImg ? <img className="header-img" src={this.listImg} /> : <div className="title-text">{this.listTitle}</div>}
          <img className="delete" src='../../assets/img/ic_close_black_24dp_1x.png' onClick={this.delete} />
        </div>
        <div className="list-content" style={{background: this.state.showSpinner ? 'rgba(0,0,0,0)' : 'white'}}>
          {this.state.showSpinner ? loader : null}
          {this.state.data ? fpLis : null}
        </div>
      </div>
    );
  }
}


const styles = {
  image: {
    width: 75,
    height: 75,
    minWidth: 75,
    minHeight: 75,
    marginRight: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
  }
};

const loader = (<div className="sk-double-bounce">
  <div className="sk-child sk-double-bounce1"></div>
  <div className="sk-child sk-double-bounce2"></div>
</div>);

export default List;
