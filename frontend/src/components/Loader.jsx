import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="info"
      style={{
        width: "100px", // Adjust the width
        height: "100px", // Adjust the height
        display: "block",
        margin: "100px auto",
      }}
    />
  );
};

export default Loader;
