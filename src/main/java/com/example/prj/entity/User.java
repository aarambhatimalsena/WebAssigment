package com.example.prj.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="users")
public class User {
    @Id
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_id_seq", allocationSize = 1)
    @GeneratedValue(generator="user_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name="firstName", nullable = false, length = 255)
    private String firstName;

    @Column(name="lastName", nullable = false, length = 255)
    private String lastName;

    @Column(name="email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name="password", nullable = false, length = 255)
    private String password;

    @Column(name="phoneNumber", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name="role", nullable = true, length = 50)
    private String role;
}
