package com.example.prj.service.impl;

import com.example.prj.entity.User;
import com.example.prj.repository.UserRepository;
import com.example.prj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    @Override
    public User updateUser(Integer id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
