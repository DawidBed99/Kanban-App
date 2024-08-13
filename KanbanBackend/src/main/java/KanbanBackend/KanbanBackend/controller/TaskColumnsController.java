package KanbanBackend.KanbanBackend.controller;


import KanbanBackend.KanbanBackend.model.TaskColumns;
import KanbanBackend.KanbanBackend.service.TasksColumnsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasksColumns")
@CrossOrigin("*")
public class TaskColumnsController {

    @Autowired
    private TasksColumnsService tasksColumnsService;

    @PostMapping
    public TaskColumns saveTasksColumn(@RequestBody TaskColumns taskColumn){

        return tasksColumnsService.saveTaskColumn(taskColumn);
    }


    @GetMapping
    public List<TaskColumns> getAllTasksColumns(){


        return tasksColumnsService.getAllTaskColumns();
    }

    @PutMapping("/{id}")
    public TaskColumns updateTaskColumn(@PathVariable int id, @RequestBody TaskColumns taskColumn){
        return tasksColumnsService.editTaskColumnName(id,taskColumn);
    }

    @DeleteMapping("/{id}")
    public void deleteTaskColumn(@PathVariable int id){tasksColumnsService.deleteTaskColumn(id);}

        @GetMapping("/specTask/{board_id}")
            public List<TaskColumns> getSpecBoards(@PathVariable int board_id){
            return tasksColumnsService.getTaskColumsByBoardID(board_id);
    }
}
