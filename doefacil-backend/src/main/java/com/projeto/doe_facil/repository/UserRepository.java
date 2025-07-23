package com.projeto.doe_facil.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.projeto.doe_facil.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{

    UserDetails findByLogin(String login);

    boolean existsByUserName(String userName);

    boolean existsByLogin(String login);

    boolean existsByEmail(String email);
}
