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
      url: `${this.props.url}`,
      success: success,
      error
    });
  }

  render() {
    let fpLis = [];
    if(this.state.data) {
      let entries = Array.from(this.state.data.getElementsByTagName("entry"));
      let items = Array.from(this.state.data.getElementsByTagName("item"));


      let toAdd = entries.length > 0 ? entries : items;

      toAdd.forEach(item => {
        let title = item.getElementsByTagName("title");
        let link = item.getElementsByTagName("link");
        fpLis.push(<li><a href={link[0].innerHTML}>{title[0].innerHTML}</a></li>);
      });

    }
    return (
      <ResizableBox className="box box react-resizable" width={300} height={700} draggableOpts={{}}
          minConstraints={[100, 100]} maxConstraints={[700, 1500]}>
          {this.state.data ? fpLis : null}
      </ResizableBox>
    );
  }
}


export default List;
