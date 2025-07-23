package com.projeto.doe_facil.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.dto.AuthenticationDTO;
import com.projeto.doe_facil.dto.UserDTO;
import com.projeto.doe_facil.model.UserModel;
import com.projeto.doe_facil.service.UserService;
import com.projeto.doe_facil.utils.enums.UserRole;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody @Valid UserDTO userDTO) {


        if(userService.existsByUserName(userDTO.getUserName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflito: Esse nome de usuário já existe");
        }
        if(userService.existsByLogin(userDTO.getLogin())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflito: Esse login já existe");
        }
        if(userService.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflito: Esse e-mail já existe");
        }

        UserModel user = new UserModel();

        BeanUtils.copyProperties(userDTO, user);
        user.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        user.setAllowed(false);
        user.setRole(UserRole.USER);

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

}
