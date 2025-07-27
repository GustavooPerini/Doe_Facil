package com.projeto.doe_facil.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.projeto.doe_facil.model.UserModel;

/**
 * Interface que herda JpaRepository para que seja possível criar queries personalidadas e utilizar
 * queries padrões.
 * @author Gustavo Perini.
 */
@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{

    /**
     * Realiza uma busca com o login do usuário. Método importante para o Spring Security.
     * @param login login do usuário.
     * @return A interface UserDetais do Spring Security.
     */
    UserDetails findByLogin(String login);

    /**
     * Verifica se existe algum usuário com o userName passado.
     * @param userName nome do usuário no sistema.
     * @return true se existir, false se não.
     */
    boolean existsByUserName(String userName);

    /**
     * Verifica se existe algum usuário com o login passado.
     * @param login login do usuário.
     * @return true se existir, false se não.
     */
    boolean existsByLogin(String login);

    /**
     * Verifica se existe algum usuário com o e-mail passado.
     * @param email e-mail do usuário.
     * @return true se existir, false se não.
     */
    boolean existsByEmail(String email);
}
