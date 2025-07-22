package com.projeto.doe_facil.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.dto.UserDTO;
import com.projeto.doe_facil.model.UserModel;
import com.projeto.doe_facil.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserControlle {
    
    @Autowired
    private UserService userService;

    @PostMapping("/new")
    public ResponseEntity<Object> registerUser(@RequestBody @Valid UserDTO userDTO) {


        if(userService.existsByAppName(userDTO.getAppName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflito: Esse nome de usuário já existe");
        }
        if(userService.existsByUserName(userDTO.getUserName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflito: Esse login já existe");
        }
        if(userService.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflito: Esse e-mail já existe");
        }

        UserModel user = new UserModel();

        BeanUtils.copyProperties(userDTO, user);
        user.setPasswd(new BCryptPasswordEncoder().encode(userDTO.getPasswd()));
        user.setAllowed(false);
        user.setRole("USER");

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

}
