import React, {Component} from 'react';
import {ResizableBox} from 'react-resizable';
import $ from 'jQuery';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {

    const success = (data) => {
      this.setState({data: data});
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
    this.props.delete(this.props.id);
  }

  render() {
    let fpLis = [];
    if(this.state.data) {
      let entries = Array.from(this.state.data.getElementsByTagName("entry"));
      let items = Array.from(this.state.data.getElementsByTagName("item"));


      let toAdd = entries.length > 0 ? entries : items;

      toAdd.forEach(item => {
        let title = item.getElementsByTagName("title")[0].innerHTML;
        title = title.replace("<![CDATA[","");
        title = title.replace("]]>","");
        let link = item.getElementsByTagName("link");
        let content = item.getElementsByTagName("content");
        let img = null;
        if(content[0]) {
          img = content[0].getAttribute("url");
          if(!img && content[0]) {
            let regex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
            let match = regex.exec(content[0].innerHTML);
            if(match) img = match[0];
          }
        }
        link = link[0].innerHTML ? link[0].innerHTML : link[0].getAttribute("href");
        fpLis.push(<a href={link}><li className="outerLink" style={styles.item}><img src={img} style={styles.image}></img>{title}</li></a>);
      });

    }
    return (
      <ResizableBox className="box box react-resizable" width={300} height={700} draggableOpts={{}}
          minConstraints={[200, 100]} maxConstraints={[700, 1500]}>
          <button onClick={this.delete}>Delete</button>
          {this.state.data ? fpLis : null}
      </ResizableBox>
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


export default List;
