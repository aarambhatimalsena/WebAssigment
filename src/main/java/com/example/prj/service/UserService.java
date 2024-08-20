package com.example.prj.service;

import com.example.prj.entity.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);
    User loginUser(String email, String password);
    User updateUser(Integer id, User user);
    void deleteUser(Integer id);
    User getUserById(Integer id);
    List<User> getAllUsers();
}
