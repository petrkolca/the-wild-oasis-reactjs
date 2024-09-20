import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateBooking } from '../../services/apiBookings';

import toast from 'react-hot-toast';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    // receives Data from the function inside of the mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was successfully checked in`);

      queryClient.invalidateQueries({
        // queryKey: ['booking'],
        active: true, // in case we don't remember the queryKey
      });
      // navigate(`/bookings/${data.id}`);
      navigate('/');
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkin, isCheckingIn };
}
