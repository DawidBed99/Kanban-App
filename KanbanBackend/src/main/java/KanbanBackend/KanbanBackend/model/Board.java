package KanbanBackend.KanbanBackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity

@Data


public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String boardName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBoardName() {
        return boardName;
    }

    public void setBoardName(String boardName) {
        this.boardName = boardName;
    }

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "board",  fetch = FetchType.LAZY)
//    @JoinColumn(name = "task_FK", referencedColumnName = "id")
    private List<TaskColumns> taskColumn;

    @JsonManagedReference

    public List<TaskColumns> getTaskColumn() {
        return taskColumn;
    }

    public void setTaskColumn(List<TaskColumns> taskColumn) {
        this.taskColumn = taskColumn;
    }
}
