import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';

// import styled from 'styled-components';
import Empty from '../../ui/Empty';
import { useCabinsFetch } from './useCabinsFetch';

const CabinTable = () => {
  const { isLoading, cabins } = useCabinsFetch();
  const [searchParams] = useSearchParams();
  // console.log(cabins);
  const filterValue = searchParams.get('discount') ?? 'all';
  let filteredCabins;

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1. Filter
  if (filterValue === 'all') {
    filteredCabins = cabins;
  }

  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => Number(cabin.discount) > 0);
  }

  // 2. Sort By
  // default Supabase table parameter is (startDate-asc)
  const sortBy = searchParams.get('sortBy') ?? 'startDate-asc';
  // seperating sorby value in two values
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  // Sort the filteredCabins array and assign the result to sortedCabins
  const sortedCabins = filteredCabins.sort(
    // Comparison function to determine the order of elements
    (a, b) =>
      // Compare the value of the property specified by 'field' in object 'a'
      // with the value of the property specified by 'direction' in object 'b'
      (a[field] - b[field]) * modifier,
    // If the returned value is negative, the 'a' will be sorted before 'b'.
    // If the returned value is positive, the 'b' will be sorted before 'a'.
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => {
            return <CabinRow cabin={cabin} key={cabin.id} />;
          }}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
