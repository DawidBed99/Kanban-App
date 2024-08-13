package KanbanBackend.KanbanBackend.controller;


import KanbanBackend.KanbanBackend.model.Board;
import KanbanBackend.KanbanBackend.repository.TasksColumnsRepository;
import KanbanBackend.KanbanBackend.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/boards")
@CrossOrigin("*")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private TasksColumnsRepository tasksColumnsRepository;

    @PostMapping
    public Board saveBoard(@RequestBody Board board){


        return boardService.saveBoard(board);
    }

//    @PostMapping
//    public ResponseEntity<Board> saveBoard(@RequestBody Board board){
//
//
//        return new ResponseEntity<Board>(boardService.saveBoard(board), HttpStatus.CREATED);
//    }

    @GetMapping
    public List<Board> getAllBoards(){
        return boardService.getAllBoards();
    }

    @GetMapping("/spec/{id}")
    public Optional<Board> getSingleBoard(@PathVariable int id){
        return boardService.getSingleBoard(id);
    }

//    @GetMapping("/specBoard")
//    public List<Board> getSpecBoards(){
//        return boardService.getSpecBoards();
//    }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable int id){boardService.deleteBoard(id);}


    @PutMapping("/{id}")
    public Board updateBoardName(@PathVariable int id, @RequestBody Board boardName){
    return boardService.editBoardName(id, boardName);}

    @PostMapping("/all")
    public List<Board> saveAllBoard(@RequestBody List<Board> boards){
        return boardService.saveAllBoard(boards);
    }



}


