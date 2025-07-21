package com.projeto.doe_facil.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.doe_facil.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long>{

    
}
