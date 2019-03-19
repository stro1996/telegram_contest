import React, { Component } from 'react';

class Button extends Component {

  onPressOnButton = () => {
    const { index, onPress } = this.props;
    onPress(index);
  };

  render() {
    const { title } = this.props;
    return (
      <button onClick={this.onPressOnButton}>
        <p>{title}</p>
      </button>
    )
  }
}

export default Button;
