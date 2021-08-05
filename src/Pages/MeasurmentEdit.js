import React from "react";
import { useHistory } from "react-router";

const MeasurmentEdit = () => {
  const history = useHistory();
  const id = history.location.pathname.split("/")[2];
  const name = history.location.pathname.split("/")[1];
  return (
    <div>
      <h1>Lets edit</h1>
    </div>
  );
};

export default MeasurmentEdit;
