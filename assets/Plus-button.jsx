import * as React from "react";
import Svg, { Circle, G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PlusButton = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}
  >
    <Circle cx={28} cy={28} r={24} fill="#E600FF" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={3}
      d="M28.5 21v15M21 28.5h15"
    />
  </Svg>
);

export default PlusButton;
