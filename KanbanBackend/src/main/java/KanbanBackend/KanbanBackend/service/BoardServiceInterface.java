package KanbanBackend.KanbanBackend.service;

import KanbanBackend.KanbanBackend.model.Board;

import java.util.List;
import java.util.Optional;

public interface BoardServiceInterface {
    public Board saveBoard(Board board);

    List<Board> getAllBoards();

    public Optional <Board> getSingleBoard(int id);

//    List<Board> getSpecBoards();

    void deleteBoard( int id);
    Board editBoardName(int id, Board boardName);

    public List<Board> saveAllBoard(List<Board> boards);

}
