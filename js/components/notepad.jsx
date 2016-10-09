import React, {Component} from 'react';

class Notepad extends Component {

  constructor(props){
    super(props);
    this.state = {
      notes: ""
    }
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    chrome.storage.sync.get('notes', data => {
      this.setState({notes: data.notes});
    });
  }

  updateState (field) {
    return e => {
      if (field === "notes") {
        chrome.storage.sync.set({'notes': e.currentTarget.value});
      }
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render() {
    return(
      <div>
        <textarea className="note-input" value={this.state.notes} 
        onChange={this.updateState("notes")} placeholder="Jot down notes and reminders"></textarea>
      </div>
    );
  }
}

export default Notepad;