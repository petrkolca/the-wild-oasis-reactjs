import styled, { css } from 'styled-components';

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"};
// `;

const Heading = styled.h1`
  /* $ {10 > 5 ? "30px" : "5px"}; */
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

  line-height: 1.4;
  white-space: pre-line;
`;

export default Heading;
