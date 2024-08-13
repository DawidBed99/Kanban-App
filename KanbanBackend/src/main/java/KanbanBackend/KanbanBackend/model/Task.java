package KanbanBackend.KanbanBackend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String taskName;

    private String taskDesc;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
//    private LocalDate dateOfCreate;

    private String dateOfCreate;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDateOfCreate() {
        return dateOfCreate;
    }

    public void setDateOfCreate(String dateOfCreate) {
        this.dateOfCreate = dateOfCreate;
    }

    public String getTaskDesc() {
        return taskDesc;
    }

    public void setTaskDesc(String taskDesc) {
        this.taskDesc = taskDesc;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    @ManyToOne
    @JoinColumn(name="taskColumn_id", referencedColumnName = "id")
    @JsonBackReference
    private TaskColumns taskColumn;

    public TaskColumns getTaskColumn() {
        return taskColumn;
    }

    public void setTaskColumn(TaskColumns taskColumn) {
        this.taskColumn = taskColumn;
    }
}
