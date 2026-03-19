import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SpoilerFlag = ({ stroke = "#DEDEDE", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5.15 2v20M5.15 4h11.2c2.7 0 3.3 1.5 1.4 3.4l-1.2 1.2c-.8.8-.8 2.1 0 2.8l1.2 1.2c1.9 1.9 1.2 3.4-1.4 3.4H5.15"
    />
  </Svg>
);

export default SpoilerFlag;
