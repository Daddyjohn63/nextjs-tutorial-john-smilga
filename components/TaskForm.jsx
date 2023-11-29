import { createTask } from '@/utils/actions';

const TaskForm = () => {
  return (
    <form action={createTask}>
      <div className="join w-full">
        <input
          className="input input-bordered join-item w-full"
          placeholder="Type Here"
          type="text"
          name="content" //critical to add if you want to use server actions.
          required
        />
        <button type="submit" className="btn join-item btn-primary">
          create task
        </button>
      </div>
    </form>
  );
};
export default TaskForm;
