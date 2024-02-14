import React, { useState } from "react";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function UserAlert(props) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const { variant, message } = props;
  return (
    <>
      {show && (
        <Alert variant={variant}>
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      )}
    </>
  );
}
UserAlert.defaultProps = {
  variant: "success",
  message: "Your request was successful",
};

export default UserAlert;
