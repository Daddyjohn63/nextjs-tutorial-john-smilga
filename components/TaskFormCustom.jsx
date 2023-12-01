'use client';
import { createTaskCustom } from '@/utils/actions';
import { useEffect } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import toast from 'react-hot-toast';

//https://react.dev/reference/react-dom/hooks/useFormState
const SubmitBtn = () => {
  const { pending } = useFormStatus(); //stores the status of the last form submission.https://react.dev/reference/react-dom/hooks/useFormStatus
  return (
    <button
      type="submit"
      className="btn join-item btn-primary"
      disabled={pending}
    >
      {' '}
      {pending ? 'please wait...' : 'create task'}
    </button>
  );
};

const initialState = {
  message: null
};

const TaskForm = () => {
  const [state, formAction] = useFormState(createTaskCustom, initialState);

  useEffect(() => {
    if (state.message === 'error') {
      toast.error('there was an error');
      return;
    }
    if (state.message) {
      toast.success('task created');
    }
  }, [state]);

  return (
    <form action={formAction}>
      {state.message ? <p className="mb-2">{state.message}</p> : null}
      <div className="join w-full">
        <input
          className="input input-bordered join-item w-full"
          placeholder="Type Here"
          type="text"
          name="content" //critical to add if you want to use server actions.
          required
        />
        <SubmitBtn />
      </div>
    </form>
  );
};
export default TaskForm;
