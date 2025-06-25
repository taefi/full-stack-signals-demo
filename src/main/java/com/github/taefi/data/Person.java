package com.github.taefi.data;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public class Person {

    private String name;
    private LocalDate birthDate;

    public Person() {
    }

    public Person(String name, LocalDate birthDate) {
        this.name = name;
        this.birthDate = birthDate;
    }

    @NotEmpty
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
}
