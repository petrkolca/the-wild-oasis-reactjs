import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import { UseDarkMode } from '../context/UseDarkMode';
import ButtonIcon from './ButtonIcon';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = UseDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
