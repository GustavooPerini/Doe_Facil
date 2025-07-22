package com.projeto.doe_facil.dto;

import jakarta.validation.constraints.NotBlank;

public class UserDTO {
    
    @NotBlank
    private String appName;

    @NotBlank
    private String userName;

    @NotBlank
    private String passwd;

    @NotBlank
    private String email;

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
