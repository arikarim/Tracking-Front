import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import final from "../PureFunctions/date";
import dateHandle from "../PureFunctions/time";
import "./progress.css";
import RadialSeparators from "./RadialSeparators";
const Progress = ({ number, time }) => {
  return (
    <Row className="my-2 pro p-3">
      <h4 className="text-center">Your achivement for {time}</h4>
      <div className="mx-auto" style={{ width: 200, height: 200 }}>
        <CircularProgressbarWithChildren
          value={number && number}
          text={`${number && number}%`}
          strokeWidth={10}
          styles={buildStyles({
            strokeLinecap: "butt",
          })}
        >
          <RadialSeparators
            count={12}
            style={{
              background: "#fff",
              width: "2px",
              // This needs to be equal to props.strokeWidth
              height: `${10}%`,
            }}
          />
        </CircularProgressbarWithChildren>
      </div>
    </Row>
  );
};

export default Progress;
