import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  selectTasks,
  selectLoading,
  selectError,
} from "../../store/modules/task/selectors";
import { fetchTasks, updateTask } from "../../store/modules/task/actions";
import { Task } from "../../store/modules/task/types";
import TaskColumn from "../TaskColumn/index";
import AddTaskModal from "../AddTaskModal/index";
import Loading from "../Loading/index";
import ErrorBox from "../ErrorBox/index";
import Header from "../Header/index";
import styles from "./TaskBoard.module.css";
import { DragDropContext } from "react-beautiful-dnd";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

type Column = {
  title: TaskStatus;
  items: Task[];
};
type Columns = {
  [key: string]: Column;
};

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [taskToEdit, setTaskToEdit] = React.useState<Task | undefined>(
    undefined
  );

  console.log("tasks", tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Static columns keys
  const [columns, setColumns] = React.useState<Columns>(() => ({
    todo: {
      title: "TODO",
      items: [],
    },
    inprogress: {
      title: "IN_PROGRESS",
      items: [],
    },
    done: {
      title: "DONE",
      items: [],
    },
  }));

  // Update items in columns when tasks change
  useEffect(() => {
    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: tasks.filter((task: Task) => task.status === "TODO"),
      },
      inprogress: {
        ...prev.inprogress,
        items: tasks.filter((task: Task) => task.status === "IN_PROGRESS"),
      },
      done: {
        ...prev.done,
        items: tasks.filter((task: Task) => task.status === "DONE"),
      },
    }));
  }, [tasks]);

  // DND handler
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;

    if (sourceColId === destColId) {
      // Same column reorder
      const column = columns[sourceColId];
      const copiedItems = Array.from(column.items);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [sourceColId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      // Move to different column
      const sourceColumn = columns[sourceColId];
      const destColumn = columns[destColId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      const updatedTask = {
        ...removed,
        status: destColumn.title as Task["status"],
      };
      destItems.splice(destination.index, 0, updatedTask);

      setColumns({
        ...columns,
        [sourceColId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destColId]: {
          ...destColumn,
          items: destItems,
        },
      });

      dispatch(updateTask(updatedTask));
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTaskToEdit(undefined);
    setIsModalOpen(false);
  };

  if (error) {
    return <ErrorBox message={error} onRetry={() => dispatch(fetchTasks())} />;
  }

  return (
    <Loading loading={loading}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box className={styles.headerBox}>
          <Header onAdd={() => setIsModalOpen(true)} />
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.columns}>
            {Object.entries(columns).map(([colId, column]) => (
              <TaskColumn
                key={colId}
                droppableId={colId}
                title={
                  column.title === "TODO"
                    ? "To Do"
                    : column.title === "IN_PROGRESS"
                    ? "In Progress"
                    : "Done"
                }
                tasks={column.items}
                status={column.title as Task["status"]}
                onEditTask={handleEditTask}
              />
            ))}
          </Box>
          <AddTaskModal
            open={isModalOpen}
            onClose={handleCloseModal}
            taskToEdit={taskToEdit}
          />
        </Box>
      </DragDropContext>
    </Loading>
  );
};

export default TaskBoard;
