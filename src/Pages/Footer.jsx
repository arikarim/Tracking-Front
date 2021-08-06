import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link, useHistory } from "react-router-dom";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  useEffect(() => {
    if (value === 0) history.push("/");
    else if (value === 1) history.push("/addrecord");
    else if (value === 2) history.push("/series");
    else if (value === 3) history.push("/search");
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="bg-dark"
    >
      <BottomNavigationAction
        className="text-light mx-0"
        label="Track it"
        icon={<TrendingUpIcon />}
      />
      <BottomNavigationAction
        className="text-light mx-0"
        label="Add Record"
        to="/addrecoerd"
        icon={<LibraryAddIcon />}
      />
      <BottomNavigationAction
        className="text-light mx-0"
        label="Progress"
        icon={<DonutLargeIcon />}
      />
      <BottomNavigationAction
        className="text-light mx-0"
        label="More"
        icon={<MoreHorizIcon />}
      />
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;