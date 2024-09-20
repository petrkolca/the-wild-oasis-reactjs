import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success('Booking was successfully deleted!');

      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBooking, isDeleting };
}
