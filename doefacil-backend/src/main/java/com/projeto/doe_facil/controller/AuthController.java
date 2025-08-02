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
import com.projeto.doe_facil.dto.LoginResponseDTO;
import com.projeto.doe_facil.dto.UserDTO;
import com.projeto.doe_facil.model.UserModel;
import com.projeto.doe_facil.security.TokenService;
import com.projeto.doe_facil.service.UserService;
import com.projeto.doe_facil.utils.enums.UserRole;

import jakarta.validation.Valid;

/**
 * Controlador responsável pela autenticação(login) e cadastro de usuários.
 * @author Gustavo Perini.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    /**
     * Serviço do Spring Security para faze a autenticação.
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Serviço dos usuários.
     */
    @Autowired
    private UserService userService;

    /**
     * Serviço de token.
     */
    @Autowired
    private TokenService tokenService;

    /**
     * Método responsável pela realização de login de um usuário.
     * @param data DTO com as informações de login.
     * @return Um http response junto de um JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data) {
        
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UserModel)auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    /**
     * Método responsável pela realização de cadastro de um usuário.
     * @param userDTO DTO com as informações de cadastro.
     * @return Um http response junto do novo objeto criado.
     */
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
