import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Task } from "../../store/modules/task/types";
import TaskCard from "../TaskCard/index";
import styles from "./TaskColumn.module.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface TaskColumnProps {
  droppableId: string;
  title: string;
  subtitle?: string;
  tasks: Task[];
  status: Task["status"];
  onAddTask?: () => void;
  onEditTask: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  droppableId,
  title,
  subtitle,
  tasks,
  onEditTask,
}) => {
  console.log("droppableId", droppableId);
  return (
    <Paper className={styles.columnPaper}>
      <Typography variant='h6' className={styles.columnTitle}>
        {title}{" "}
        {subtitle && <span className={styles.columnSubtitle}>{subtitle}</span>}
      </Typography>
      <Droppable droppableId={droppableId}>
        {(dropProvided) => (
          <div
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
            className={styles.columnTasks}
            style={{ minHeight: 100 }}>
            {tasks.map((task, index) => (
              <Draggable
                draggableId={String(task.id)}
                index={index}
                key={task.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: "none",
                      marginBottom: 8,
                      ...provided.draggableProps.style,
                    }}>
                    <TaskCard task={task} onEdit={onEditTask} />
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default TaskColumn;
