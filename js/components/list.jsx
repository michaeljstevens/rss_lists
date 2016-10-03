import React, {Component} from 'react';
import {ResizableBox} from 'react-resizable';

class List extends Component {
  render() {
    return (
      <ResizableBox className="box box react-resizable" width={200} height={200} draggableOpts={{}}
          minConstraints={[100, 100]} maxConstraints={[300, 300]}>
          test
      </ResizableBox>
    );
  }
}

export default List;
