package com.projeto.doe_facil.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projeto.doe_facil.model.UserModel;
import com.projeto.doe_facil.repository.UserRepository;

/**
 * Serviço responsável por toda regra de negócio relacionado ao usuário.
 * @author Gustavo Perini.
 */
@Service
public class UserService implements UserDetailsService{

    /**
     * Repositório do usuário
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Método da interface UserDetailsService. Ela busca um usuário pelo login para fazer a autenticação.
     * @param username O login do usuário.
     * @return Um objeto de UserDetails.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByLogin(username);
    }

    /**
     * Método que salva um usuário no banco de dados.
     * @param userModel Um objeto que representa um usuário.
     * @return O objeto do usuário que foi salvo.
     */
    public UserModel save(UserModel userModel) {
        return userRepository.save(userModel);
    }

    /**
     * Método que retorna todos os usuários no banco de dados.
     * @return Uma lista com todos os usuários.
     */
    public List<UserModel> findAll() {
        return userRepository.findAll();
    }

    /**
     * Método que encontra um usuário no banco de dados pelo Id.
     * @param id Id do usuário.
     * @return Um Optional com o usuário.
     */
    public Optional<UserModel> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Método que deleta um usuário do banco de dados.
     * @param user Um usuário.
     */
    public void deleteUser(UserModel user) {
        userRepository.delete(user);
    }

    /**
     * Verifica se existe algum usuário com o userName passado.
     * @param userName nome do usuário no sistema.
     * @return true se existir, false se não.
     */
    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    /**
     * Verifica se existe algum usuário com o login passado.
     * @param login login do usuário.
     * @return true se existir, false se não.
     */
    public boolean existsByLogin(String login) {
        return userRepository.existsByLogin(login);
    }

    /**
     * Verifica se existe algum usuário com o e-mail passado.
     * @param email e-mail do usuário.
     * @return true se existir, false se não.
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
}
