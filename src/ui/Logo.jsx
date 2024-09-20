import styled from 'styled-components';
import { UseDarkMode } from '../context/UseDarkMode';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = UseDarkMode();

  const imgSrc = !isDarkMode ? '/logo-light.png' : '/logo-dark.png';

  return (
    <StyledLogo>
      <Img src={imgSrc} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
