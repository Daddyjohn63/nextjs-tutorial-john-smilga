'use client';
import { createTaskCustom } from '@/utils/actions';
import { useFormStatus, useFormState } from 'react-dom';
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
