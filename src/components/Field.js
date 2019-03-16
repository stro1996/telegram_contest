import React, { Component } from 'react';
import { Line } from 'react-lineto';

class Field extends Component {
  render() {
    const { heightGap, width } = this.props;
    const arrForRender = [1, 2, 3, 4, 5, 6];
    return (
      <div>
        {
          arrForRender.map((item, index) => {
            const positionByY = heightGap * (index + 1);
            return (
              <React.Fragment key={index}>
                <div style={{position: 'absolute', top: positionByY - 50}}>
                  <p style={{fontSize: '20px'}}>{item}</p>
                </div>
                <Line
                  borderColor={'gray'}
                  x0={0}
                  y0={positionByY}
                  x1={width}
                  y1={positionByY}
                />
              </React.Fragment>
            );
          })
        }
      </div>
    )
  }
}

export default Field;
