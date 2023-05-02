"use client";

import { ITask } from "@/types/tasks";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { deleteTodo, editTodo } from "@/api";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setTaskToEdit("");
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(task);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="">{task.text}</td>
      <td className="flex gap-5">
        <AiOutlineEdit onClick={() => setOpenModalEdit(true)} size={25} className="text-blue-400" cursor="pointer" />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <AiOutlineDelete onClick={() => setOpenModalDelete(true)} size={25} className="text-red-400" cursor="pointer" />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="font-bold text-lg">Delete Task?</h3>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={() => handleDeleteTodo()}>
              Yes
            </button>
            <button className="btn" onClick={() => setOpenModalDelete(false)}>
              No!
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
}

export default Task;
