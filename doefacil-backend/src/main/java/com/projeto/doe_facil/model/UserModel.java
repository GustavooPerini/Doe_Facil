package com.projeto.doe_facil.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserModel implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String appName;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String passwd;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private boolean allowed;

    public UserModel(String appName, String userName, String passwd, String email, String role, boolean allowed) {
        this.appName = appName;
        this.userName = userName;
        this.setPasswd(passwd);
        this.email = email;
        this.role = role;
        this.allowed = allowed;
    }

    public UserModel() {
        
    }

    //##############################################################################################
    // IMPLEMENTACAO METODOS DO USERDETAILS
    //##############################################################################################

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("USER");
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
       return this.passwd;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
		return true;
	}

    @Override
    public boolean isAccountNonLocked() {
		return true;
	}
    
    @Override
    public boolean isCredentialsNonExpired() {
		return true;
	}

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    //##################################################################################################################
    // GETTERS AND SETTERS
    //##################################################################################################################

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isAllowed() {
        return allowed;
    }

    public void setAllowed(boolean allowed) {
        this.allowed = allowed;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = new BCryptPasswordEncoder().encode(passwd);
    }
}
