import { useSearchParams } from 'react-router-dom';
import Select from './Select';

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get('sortBy') ?? options[0].value;

  const onChangeHandler = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(new URLSearchParams(searchParams));
  };

  return (
    <Select
      options={options}
      type="white"
      value={sortByValue}
      onChange={onChangeHandler}
    />
  );
};

export default SortBy;
