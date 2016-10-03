import React, {Component} from 'react';
import {ResizableBox} from 'react-resizable';
import $ from 'jQuery';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
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
      url: 'https://www.reddit.com/.rss',
      success: success,
      error
    });
  }

  render() {
    let fpLis = [];
    if(this.state.data) {
      let entries = Array.from(this.state.data.getElementsByTagName("entry"));
      entries.forEach( entry => {
        let title = entry.getElementsByTagName("title");
        fpLis.push(<li>{title[0].innerHTML}</li>);
      });
    }
    return (
      <ResizableBox className="box box react-resizable" width={200} height={200} draggableOpts={{}}
          minConstraints={[100, 100]} maxConstraints={[300, 300]}>
          {this.state.data ? fpLis : null}
      </ResizableBox>
    );
  }
}

export default List;
