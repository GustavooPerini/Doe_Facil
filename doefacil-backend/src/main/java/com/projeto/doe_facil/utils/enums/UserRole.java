package com.projeto.doe_facil.utils.enums;

/**
 * Enum que classifica a role do usuário.
 * @author Gustavo Perini.
 */
public enum UserRole {
    ADMIN("admin"),
    USER("user");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
