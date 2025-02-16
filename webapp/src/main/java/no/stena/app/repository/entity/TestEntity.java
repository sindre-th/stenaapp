package no.stena.app.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "TEST_TABLE")
@Data
public class TestEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "NAME", length = 50)
    private String name;

    @Column(name = "AGE")
    private Integer age;
}
