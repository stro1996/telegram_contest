import React, { Component } from 'react';

class Resizer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  componentWillUnmount(){
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  onMouseDown(e) {
    this.props.updateStateResizing( true);
  }

  onMouseMove(e) {
    if (this.props.isResizing) {
      this.props.funcResizing(e.clientX, e.clientY);
    }
  }

  onMouseUp(e) {
    if (this.props.isResizing) {
      this.props.updateStateResizing(false);
    }
  }

  render() {
    const style = {
      position: 'absolute',
      left: `${this.props.defaultX}px`,
      width:  this.props.resizerWidth,
      height: this.props.resizerHeight,
      backgroundColor: 'red',
    };

    return (
      <div style={style} onMouseDown={this.onMouseDown.bind(this)}>

      </div>
    );
  }
};

export default Resizer;
