package KanbanBackend.KanbanBackend.controller;


import KanbanBackend.KanbanBackend.model.Task;
import KanbanBackend.KanbanBackend.model.TaskColumns;
import KanbanBackend.KanbanBackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task saveTask(@RequestBody Task task){

        return taskService.saveTask(task);
    }
    @GetMapping
    public List<Task> getAllTasks(){


        return taskService.getAllTasks();
    }

    @PutMapping("/{id}")
    public Task updateTaskName(@PathVariable int id, @RequestBody Task task){
        return taskService.editTaskName(id,task);
    }
    @PutMapping("/updateDesc/{id}")
    public Task updateTaskDesc(@PathVariable int id, @RequestBody Task task){
        return taskService.editTaskDesc(id,task);
    }
    @PutMapping("/updateTaskColumnForTask/{id}")
    public Task updateTaskColumn(@PathVariable int id, @RequestBody Task task){
        return taskService.editTaskColumn(id,task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable int id){taskService.deleteTask(id);}

    @GetMapping("/{task_id}")
    public List<Task> getSpecBoards(@PathVariable int task_id){

        return taskService.getTaskNameByID(task_id);
    }

    @GetMapping("/tasksColumnName/{task_id}")
    public String getTasksColumnName(@PathVariable int task_id){
        return taskService.getTasksColumnName(task_id);
    }


}
