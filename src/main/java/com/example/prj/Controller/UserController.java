package com.example.prj.controller;

import com.example.prj.entity.User;
import com.example.prj.payload.ApiResponse;
import com.example.prj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        ApiResponse<User> response = new ApiResponse<>(true, "User registered successfully", registeredUser);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> loginUser(@RequestBody User loginRequest) {
        User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        ApiResponse<User> response = new ApiResponse<>(true, "Login successful", user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        ApiResponse<User> response = new ApiResponse<>(true, "User fetched successfully", user);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        ApiResponse<List<User>> response = new ApiResponse<>(true, "Users fetched successfully", users);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        ApiResponse<User> response = new ApiResponse<>(true, "User updated successfully", user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        ApiResponse<Void> response = new ApiResponse<>(true, "User deleted successfully", null);
        return ResponseEntity.ok(response);
    }
}
