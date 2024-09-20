import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

const Stats = ({ bookings, confirmedStays, numDays, numCabins }) => {
  // 1. Number of Bookings
  const numBookings = bookings.length;

  // 2. Total Sales
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  // 3. Total check-ins
  const totalCheckins = confirmedStays.length;

  // 4. Occupation Rate
  // number of check-in nights / all available nights of cabins
  // (number of days * number of cabins)
  const occupationRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={totalCheckins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={Math.round(occupationRate * 100) + '%'}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
};

export default Stats;
