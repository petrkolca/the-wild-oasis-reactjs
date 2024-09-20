import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: (userObj) => signupApi(userObj),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from user's email address.",
      );
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { signup, isSigningUp };
}
