package KanbanBackend.KanbanBackend.service;

import KanbanBackend.KanbanBackend.model.Board;
import KanbanBackend.KanbanBackend.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class BoardService implements BoardServiceInterface {
    @Autowired
    private BoardRepository boardRepository;


    @Override
    public Board saveBoard(Board board) {

        if(boardRepository.existsBoardByBoardName(board.getBoardName())){
            throw new RuntimeException("Project already exists in Database!");
        }
        else{
            return boardRepository.save(board);

        }
    }

    @Override
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    @Override
    public Optional<Board> getSingleBoard(int id) {
        return boardRepository.findById(id);

    }

//    @Override
//    public List<Board> getSpecBoards() {
//        return boardRepository.findBoardsByBoardName2();
//    }

    @Override
    public void deleteBoard(int id) {
        boardRepository.deleteById(id);
    }

    @Override
    public Board editBoardName(int id, Board boardName) {
        Board boardToEdit = boardRepository.findById(id).orElseThrow();
        boardToEdit.setBoardName(boardName.getBoardName());
        return boardRepository.save(boardToEdit);
    }

    @Override
    public List<Board> saveAllBoard(List<Board> boards) {
        return boardRepository.saveAll(boards);
    }
}
