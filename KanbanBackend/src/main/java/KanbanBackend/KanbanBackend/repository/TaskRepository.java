package KanbanBackend.KanbanBackend.repository;

import KanbanBackend.KanbanBackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    @Query(value = "SELECT * FROM task WHERE id = ?1 ", nativeQuery = true)
    List<Task> findTaskById(int task_id);

    @Query(value = "SELECT * FROM task WHERE task_column_id = ?1 ", nativeQuery = true)
    List<Task> findTasksByTaskColumndID(int taskColumn_id);
}
