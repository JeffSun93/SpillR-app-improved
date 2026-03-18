import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Replies = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox="-1 -1 25 25"
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.125 11.5a8.625 8.625 0 0 1-11.868 7.994 2.707 2.707 0 0 0-.365-.134.869.869 0 0 0-.21-.023c-.08 0-.166.015-.339.043l-3.41.569c-.356.06-.535.089-.664.033a.479.479 0 0 1-.251-.251c-.056-.13-.026-.308.033-.665l.569-3.41c.029-.172.043-.259.043-.338a.87.87 0 0 0-.023-.21 2.724 2.724 0 0 0-.134-.365 8.625 8.625 0 1 1 16.62-3.243Z"
    />
  </Svg>
);
export default Replies;
