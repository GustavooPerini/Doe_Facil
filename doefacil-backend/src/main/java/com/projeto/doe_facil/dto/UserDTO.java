package com.projeto.doe_facil.dto;

import jakarta.validation.constraints.NotBlank;

public class UserDTO {
    
    @NotBlank
    private String userName;

    @NotBlank
    private String login;

    @NotBlank
    private String password;

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
