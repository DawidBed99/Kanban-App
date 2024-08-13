package KanbanBackend.KanbanBackend.service;

import KanbanBackend.KanbanBackend.model.TaskColumns;
import KanbanBackend.KanbanBackend.repository.TasksColumnsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksColumnsService implements TasksColumnsServiceInterface {
    @Autowired
    private TasksColumnsRepository tasksColumnsRepository;


    @Override
    public TaskColumns saveTaskColumn(TaskColumns taskColumns) {


        return tasksColumnsRepository.save(taskColumns);
    }

    @Override
    public List<TaskColumns> getAllTaskColumns() {
        return tasksColumnsRepository.findAll();
    }

    @Override
    public TaskColumns editTaskColumnName(int id, TaskColumns taskColumn) {
        TaskColumns taskColumnToEdit = tasksColumnsRepository.findById(id).orElseThrow();
        taskColumnToEdit.setTaskColumnName(taskColumn.getTaskColumnName());
        return tasksColumnsRepository.save(taskColumnToEdit);
    }

    @Override
    public void deleteTaskColumn(int id) {
        tasksColumnsRepository.deleteById(id);
    }

    @Override
//    public List<TaskColumns> getTasksByBoardID() {
        public List<TaskColumns> getTaskColumsByBoardID(int board_id) {
//        return tasksColumnsRepository.findTasksByBoardID();
        return tasksColumnsRepository.findTasksByBoardID(board_id);
    }
}
