package KanbanBackend.KanbanBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.SelectBeforeUpdate;

import java.util.List;

@Entity

public class TaskColumns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String taskColumnName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTaskColumnName() {
        return taskColumnName;
    }

    public void setTaskColumnName(String taskColumnName) {
        this.taskColumnName = taskColumnName;
    }

    @ManyToOne
    @JoinColumn(name="board_id", referencedColumnName = "id")
    @JsonBackReference
    private Board board;

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "taskColumn",  fetch = FetchType.LAZY)
    private List<Task> task;

    @JsonManagedReference

    public List<Task> getTask() {
        return task;
    }

    public void setTask(List<Task> task) {
        this.task = task;
    }


}
