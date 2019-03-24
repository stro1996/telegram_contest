import React, { Component } from 'react';

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

class BottomMeasure extends Component {
  render() {
    const { maxValue, step, positionByY, width, minValue, stepByDtae, delta } = this.props;
    const arrForRender = [
      new Date(minValue),
      new Date(Math.floor(minValue + (delta * 0.2))),
      new Date(Math.floor(minValue + (delta * 0.4))),
      new Date(Math.floor(minValue + (delta * 0.6))),
      new Date(Math.floor(minValue + (delta * 0.8))),
      new Date(maxValue),
    ];

    return (
      <div>
        {
          arrForRender.map((item, index) => {
            const positionByX = step * (index );
            const style = {
                  position: 'absolute',
                  top: positionByY,
                  left: positionByX,
                }
            return (
              <div style={style}>
                <p style={{fontSize: '10px'}}>{`${month[item.getMonth()]} ${item.getDate()} ${item.getFullYear()}`}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default BottomMeasure;
