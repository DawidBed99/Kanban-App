package KanbanBackend.KanbanBackend.service;

import KanbanBackend.KanbanBackend.model.Task;
import KanbanBackend.KanbanBackend.model.TaskColumns;


import java.util.List;


public interface TaskServiceInterface {

    public Task saveTask(Task task);

    List<Task> getAllTasks();

    Task editTaskName(int id, Task task);

    Task editTaskDesc(int id, Task task);

    Task editTaskColumn(int id, Task task);
    void deleteTask(int id);

    List<Task> getTaskNameByID(int task_id);

    String getTasksColumnName(int id);

}
