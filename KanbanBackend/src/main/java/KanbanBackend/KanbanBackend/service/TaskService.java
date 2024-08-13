package KanbanBackend.KanbanBackend.service;

import KanbanBackend.KanbanBackend.model.Task;
import KanbanBackend.KanbanBackend.model.TaskColumns;
import KanbanBackend.KanbanBackend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService implements TaskServiceInterface {
    @Autowired
    TaskRepository taskRepository;
    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll(
//                Sort.by(Sort.Direction.ASC, "orderNumber")
        );
    }

    @Override
    public Task editTaskName(int id, Task task) {
        Task taskToEdit = taskRepository.findById(id).orElseThrow();
        taskToEdit.setTaskName(task.getTaskName());
        return taskRepository.save(taskToEdit);
    }
    @Override
    public Task editTaskDesc(int id, Task task) {
        Task taskToEdit = taskRepository.findById(id).orElseThrow();
        taskToEdit.setTaskDesc(task.getTaskDesc());
        return taskRepository.save(taskToEdit);
    }

    @Override
    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> getTaskNameByID(int task_id) {

        return taskRepository.findTaskById(task_id);
    }

    @Override
    public String getTasksColumnName(int id) {
        Task taskToFind = taskRepository.findById(id).orElseThrow();
        return  taskToFind.getTaskColumn().getTaskColumnName();

    }

    @Override
    public Task editTaskColumn(int id, Task task) {
        Task taskToEdit = taskRepository.findById(id).orElseThrow();
        taskToEdit.setTaskColumn(task.getTaskColumn());
        return taskRepository.save(taskToEdit);
    }

    //    @Override
//    public TaskColumns getTaskColumnFromTask(int id) {
//        return null;
//    }


}
