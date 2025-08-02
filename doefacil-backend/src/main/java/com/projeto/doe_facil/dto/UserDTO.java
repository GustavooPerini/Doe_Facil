package com.projeto.doe_facil.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO que contém as informações necessárias para realizar o cadastro.
 * @author Gustavo Perini.
 */
public class UserDTO {
    
    /**
     * Nome de usuário.
     */
    @NotBlank
    private String userName;

    /**
     * Login do usuário.
     */
    @NotBlank
    private String login;

    /**
     * Senha do usuário.
     */
    @NotBlank
    private String password;

    /**
     * E-mail do usuário.
     */
    @NotBlank
    private String email;

    
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
