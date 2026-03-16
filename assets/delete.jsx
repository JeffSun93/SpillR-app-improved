import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Delete = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="-1 -1 25 25"
    fill="none"
    {...props}
  >
    <Path
      stroke="#DEDEDE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.379}
      d="M9.885 19.08c5.057 0 9.195-4.137 9.195-9.195C19.08 4.828 14.942.69 9.885.69 4.827.69.689 4.828.689 9.885c0 5.058 4.138 9.195 9.196 9.195ZM7.283 12.487l5.204-5.204M12.487 12.487 7.283 7.283"
    />
  </Svg>
);
export default Delete;
