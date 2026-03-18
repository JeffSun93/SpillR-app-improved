import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PollsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#F5F5F5"
      d="M21 5.25H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75ZM21 10.25h-9.47c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H21c.41 0 .75.34.75.75s-.34.75-.75.75ZM21 15.25H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75ZM21 20.25h-9.47c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H21c.41 0 .75.34.75.75s-.34.75-.75.75Z"
    />
  </Svg>
);
export default PollsIcon;
