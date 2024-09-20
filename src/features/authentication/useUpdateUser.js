import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (newUserData) => updateCurrentUser(newUserData),
    onSuccess: ({ user }) => {
      console.log(user);

      toast.success('User account was successfully updated!');

      queryClient.setQueryData(['user'], user);

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
