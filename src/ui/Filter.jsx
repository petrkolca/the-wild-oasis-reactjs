import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) ?? options[0].value;
  // console.log(currentFilter);

  const onClickHandler = (value) => {
    // Update the URLSearchParams instance
    if (searchParams.get('page')) searchParams.set('page', 1);

    searchParams.set(filterField, value);

    // this might not trigger a re-render if React doesn't detect the change
    // setSearchParams(searchParams);

    // Update the state with the modified NEW URLSearchParams object (new URL reference)
    setSearchParams(new URLSearchParams(searchParams));
  };

  return (
    <StyledFilter>
      {options.map((opt) => (
        <FilterButton
          key={opt.value}
          onClick={() => onClickHandler(opt.value)}
          active={
            currentFilter === opt.value ? opt.value.toString() : undefined
          }
          disabled={Boolean(currentFilter === opt.value)}
        >
          {opt.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};
export default Filter;
