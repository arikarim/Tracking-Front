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
const Progress = () => {
  const [progress, setProgress] = React.useState(0);
  const measurments = useSelector((state) => state.measurments);
  const getProgress = () => {
    const res = measurments[0]
      .filter((item) => dateHandle(item.date, final) < 29)
      .reduce((acc = 0, item) => acc + item.number);
  };
  useEffect(() => {}, [measurments]);

  return (
    <Row className="">
      {measurments[0] &&
        console.log(
          measurments[0]
            .filter((item) => dateHandle(item.date, final) < 29)
            .reduce((acc = 0, item) => acc + item.number)
        )}
      <h4 className="text-center">Your achivement in the last month</h4>
      <div className="mx-auto" style={{ width: 200, height: 200 }}>
        <CircularProgressbarWithChildren
          value={50}
          text={`${80}%`}
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
