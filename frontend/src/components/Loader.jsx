import { Spinner } from "react-bootstrap";

const Loader = ({ marginY = "100px" }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="info"
      style={{
        width: "100px", // Adjust the width
        height: "100px", // Adjust the height
        display: "block",
        margin: `${marginY} auto`,
      }}
    />
  );
};

export default Loader;
