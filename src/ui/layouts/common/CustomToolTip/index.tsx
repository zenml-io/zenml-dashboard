import React from 'react';

export const CustomToolTip: React.FC<{ name: string }> = ({ name }) => {
  const customToolTip = {
    position: 'absolute',
    border: '2px solid #f0ebfc',
    borderRadius: '5px',
    padding: '16px',
    height: '130px',
    zIndex: 1000,
    backgroundColor: 'white',
    bottom: 200,
  };
  return (
    <div
      style={customToolTip as any}

      // style={innerBoxStyleDisable}
    >
      <div
        style={{
          height: '72px',
          width: '380px',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'Rubik',
              marginBottom: '16px',
            }}
          >
            You Don't have access to this Component.
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: 16,
              color: '#666c78',
              fontFamily: 'Rubik',
              marginBottom: '8px',
            }}
          >
            Please contact your admin for further information
          </p>
          <p
            style={{
              fontSize: 16,
              color: '#666c78',
              fontFamily: 'Rubik',
            }}
          >
            or to request access for "{name}"
          </p>
          {/* <p
          style={{
            fontSize: 16,
            color: '#666c78',
            fontFamily: 'Rubik',
            marginBottom: '5px',
          }}
        >{`( ${tile.name} )`}</p> */}
        </div>
      </div>
    </div>
  );
};
