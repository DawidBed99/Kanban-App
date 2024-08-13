package KanbanBackend.KanbanBackend.service;

import KanbanBackend.KanbanBackend.model.TaskColumns;

import java.util.List;

public interface TasksColumnsServiceInterface {
    public TaskColumns saveTaskColumn(TaskColumns taskColumns);

    List<TaskColumns> getAllTaskColumns();

    TaskColumns editTaskColumnName(int id, TaskColumns taskColumn);
    void deleteTaskColumn(int id);


    List<TaskColumns> getTaskColumsByBoardID(int board_id);

//    List<TaskColumns> getTasksByBoardID();
}

