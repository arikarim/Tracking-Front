import React, { useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(1);
  const history = useHistory();
  useEffect(() => {
    const parent = document.querySelector('.parent');
    const child = Array.from(parent.getElementsByTagName('button'));
    const remove = () => (
      child.filter((el) => el.classList.contains('activee'))
        .map((el) => el.classList.remove('activee'))
    );
    if (value === 0) {
      history.push('/addrecord');
      remove();
      child[0].classList.add('activee');
    } else if (value === 1) {
      history.push('/');
      remove();
      child[1].classList.add('activee');
    } else if (value === 2) {
      history.push('/progress');
      remove();
      child[2].classList.add('activee');
    } else if (value === 3) {
      history.push('/profile');
      remove();
      child[3].classList.add('activee');
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="bg-dark parent"
    >
      <BottomNavigationAction
        className="text-light mx-0"
        label="Add Record"
        to="/addrecoerd"
        icon={<LibraryAddIcon />}
      />
      <BottomNavigationAction
        className="text-light mx-0"
        label="Track it"
        icon={<TrendingUpIcon />}
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
