import React, { Component } from 'react';
import { getColor, getName } from "../utils/getValue";

class Button extends Component {

  onPressOnButton = () => {
    const { index, onPress } = this.props;
    onPress(index);
  };

  render() {
    const { width, index, item, height } = this.props;
    const color = getColor(4, `y${index}`);
    const name = getName(4, `y${index}`);
    const isCheck = item !== null;
    return (
      <button style={{ width: width / 5, marginLeft: width / 25, height: height * 0.05, borderRadius: width / 5, outline: 'none' }} onClick={this.onPressOnButton}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
          <svg height={height * 0.05} width={width / 10}>
            <circle cx={width / 20} cy={height * 0.025} r={height * 0.015} stroke="black" strokeWidth="1" fill={isCheck ? color: 'transparent' }/>
          </svg>
          <p style={{ color, fontWeight: 'bold' }}>{name}</p>
        </div>
      </button>
    )
  }
}

export default Button;
