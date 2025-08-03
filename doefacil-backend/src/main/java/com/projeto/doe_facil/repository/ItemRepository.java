package com.projeto.doe_facil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.doe_facil.model.ItemModel;

/**
 * Interface que herda JpaRepository para que seja possível criar queries personalidadas e utilizar
 * queries padrões.
 * @author Gustavo Perini.
 */
@Repository
public interface ItemRepository extends JpaRepository<ItemModel, Long>{
    
}
