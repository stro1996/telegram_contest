import React, { Component } from 'react';
import { getColor } from "../utils/getValue";

class Button extends Component {

  onPressOnButton = () => {
    const { index, onPress } = this.props;
    onPress(index);
  };

  render() {
    const { width, index } = this.props;
    const color = getColor(4, `y${index}`)
    return (
      <button style={{ width: width / 5, marginLeft: width / 25 }} onClick={this.onPressOnButton}>
        <p style={{ color }}>y{index}</p>
      </button>
    )
  }
}

export default Button;
