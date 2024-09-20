import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';

import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    // receives Data from the function inside of the mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was successfully checked out`);

      queryClient.invalidateQueries({
        // queryKey: ['booking'],
        active: true, // in case we don't remember the queryKey
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isCheckingOut };
}
