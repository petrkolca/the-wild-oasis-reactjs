import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import FormRow from './../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  const onSubmitHandler = (data, e) => {
    const imageFile =
      typeof data.image === 'string' ? data.image : data.image[0];

    e.preventDefault();
    console.log(data);

    if (isEditSession) {
      editCabin(
        {
          existingCabinData: {
            ...data,
            image: imageFile,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createCabin(
        {
          ...data,
          image: imageFile,
        },
        {
          onSuccess: () => {
            // console.log(data);
            reset();
            onCloseModal();
          },
        },
      );
    }
  };

  const onErrorHandler = (errors) => {
    console.log(errors);
  };

  return (
    <Form
      type={onCloseModal ? 'modal' : 'regular'}
      onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1.',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1.',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                'Discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {onCloseModal ? 'Close' : 'Reset Form'}
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
