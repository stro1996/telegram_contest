import React, { Component } from 'react';

class BottomMeasure extends Component {
  render() {
    const { maxValue, step, positionByY, width, minValue, stepByDtae } = this.props;
    const arrForRender = [
      new Date(minValue),
      new Date(Math.floor(maxValue - (stepByDtae * 4))),
      new Date(Math.floor(maxValue - (stepByDtae * 3))),
      new Date(Math.floor(maxValue - (stepByDtae * 2))),
      new Date(Math.floor(maxValue - stepByDtae )),
      new Date(maxValue),
    ];
    return (
      <div>
        {
          arrForRender.map((item, index) => {
            const positionByX = step * index;
            const style = index !== 5
              ? {
                  position: 'absolute',
                  top: positionByY,
                  left: positionByX,
                }
              : {
                  position: 'absolute',
                  top: positionByY,
                  right: 0,
                }

            return (
              <div style={style}>
                <p style={{fontSize: '1em'}}>{(item.toDateString())}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default BottomMeasure;
