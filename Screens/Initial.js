import React from 'react';
import { Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const InitialsAvatar = ({ initials,  size,
    backgroundColor,
    textColor }) => {
  const circleSize = size;
  

  return (
    <Svg width={circleSize} height={circleSize}>
      <Circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={circleSize / 2}
        fill={backgroundColor}
      />
      <Text
        style={{color: "white",
        fontWeight:"bold",
        marginTop:size*0.32,
        fontSize:size*0.3,
        marginLeft:size*0.26
    }}
      >
        {initials}
      </Text>
    </Svg>
  );
};

export default InitialsAvatar;
