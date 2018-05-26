import React from "react";



const Progressbar = props => {
  const { height, value, color } = props;
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          backgroundColor: '#f0f0f0',
          poistion: 'relative',
          borderRadius: '50px',
          height
        }}>
        <div
          style={{
            width: `${value}%`,
            backgroundColor: color,
            borderRadius: '50px',
            height
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Progressbar;
