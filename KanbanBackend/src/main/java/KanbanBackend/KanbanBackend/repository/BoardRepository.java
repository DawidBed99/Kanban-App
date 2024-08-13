package KanbanBackend.KanbanBackend.repository;

import KanbanBackend.KanbanBackend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface BoardRepository extends JpaRepository<Board, Integer> {

    boolean existsBoardByBoardName(String boardName);


//    @Query(value = "SELECT t FROM Board t WHERE t.id=?1")
//    boolean existsById(int id);

//    @Query(value = "SELECT * FROM Board WHERE board_name = 'Chocolate' && id > 90 ", nativeQuery = true)
//    List<Board> findBoardsByBoardName2();
}
