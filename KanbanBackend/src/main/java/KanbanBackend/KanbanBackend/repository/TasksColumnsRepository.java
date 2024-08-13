package KanbanBackend.KanbanBackend.repository;

import KanbanBackend.KanbanBackend.model.Board;
import KanbanBackend.KanbanBackend.model.TaskColumns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TasksColumnsRepository extends JpaRepository<TaskColumns, Integer> {

    @Query(value = "SELECT * FROM task_columns WHERE board_id = ?1 ", nativeQuery = true)
//    List<TaskColumns> findTasksByBoardID();
    List<TaskColumns> findTasksByBoardID(int board_id);
}
