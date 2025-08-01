package com.projeto.doe_facil.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.model.UserModel;
import com.projeto.doe_facil.service.UserService;

/**
 * Controlador responsável pelas ações relacionadas aos usuŕios.
 * @author Gustavo Perini.
 */
@RestController
@RequestMapping("/user")
public class UserControlle {

    /**
     * Serviço dos usuários.
     */
    @Autowired
    UserService userService;

    /**
     * Métodos que retorna todos os usuários cadastrados. Apenas ADMIN podem fazer isso.
     * @return Uma lista com todos os usuários.
     */
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    /**
     * Deleta um usuário cadastrado. Apenas ADMIN podem fazer isso.
     * @param id Id do usuário que será excluído.
     * @return Uma mensagem de sucesso ou erro.
     */
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {

        Optional<UserModel> userModelOptional = userService.findById(id);
        if(!userModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
        userService.deleteUser(userModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Usuário deletado com sucesso");
    }
}
