package com.projeto.doe_facil.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.projeto.doe_facil.utils.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/**
 * Classe que representa a entidade de um usuário que será cadastrado no sistema.
 * Ela implementa a interface UserDetails do Spring Security para conseguir fazer a autenticação e autorização de um usuário no login.
 * @author Gustavo Perini.
 */
@Entity
@Table(name = "users")
public class UserModel implements UserDetails{

    /**
     * Id que será gerado e salvo no banco.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nome que o usuário terá no sistema.
     */
    @Column(nullable = false)
    private String userName;

    /**
     * Login para ter acesso ao sistema.
     */
    @Column(nullable = false)
    private String login;

    /**
     * Senha para ter acesso ao sistema.
     */
    @Column(nullable = false)
    private String password;

    /**
     * E-mail do usuário
     */
    @Column(nullable = false)
    private String email;

    /**
     * Permissões de um usuário
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    /**
     * Indica se o usuário tem acesso ou não ao sistema.
     */
    @Column(nullable = false)
    private boolean allowed;

    public UserModel(String userName, String login, String password, String email, UserRole role, boolean allowed) {
        this.userName = userName;
        this.login = login;
        this.password = password;
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
        if(this.role == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        }
        else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
       return this.password;
    }

    @Override
    public String getUsername() {
        return this.login;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public boolean isAllowed() {
        return allowed;
    }

    public void setAllowed(boolean allowed) {
        this.allowed = allowed;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
