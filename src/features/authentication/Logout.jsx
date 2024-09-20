import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from './useLogout';

const Logout = () => {
  const { logout, isLogingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLogingOut} onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
