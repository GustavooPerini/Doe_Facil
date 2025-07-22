package com.projeto.doe_facil.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.doe_facil.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{

    Optional<UserModel> findByUserName(String userName);

    boolean existsByAppName(String appName);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);
}
