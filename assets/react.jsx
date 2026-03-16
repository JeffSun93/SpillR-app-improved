import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Reaction = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    viewBox="-1 -1 23 23"
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 12.25S8.313 14 10.5 14c2.188 0 3.5-1.75 3.5-1.75m-.875-4.375h.009m-5.259 0h.009M19.25 10.5a8.75 8.75 0 1 1-17.5 0 8.75 8.75 0 0 1 17.5 0Zm-5.688-2.625a.438.438 0 1 1-.875 0 .438.438 0 0 1 .876 0Zm-5.25 0a.438.438 0 1 1-.875 0 .438.438 0 0 1 .875 0Z"
    />
  </Svg>
);
export default Reaction;
