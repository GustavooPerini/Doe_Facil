package com.projeto.doe_facil.category;

import com.projeto.doe_facil.model.Category;
import com.projeto.doe_facil.repository.CategoryRepository;
import com.projeto.doe_facil.repository.InterestRepository;
import com.projeto.doe_facil.repository.ItemRepository;
import com.projeto.doe_facil.repository.UserRepository;
import com.projeto.doe_facil.support.IntegrationTestSupport;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CategoryControllerIT extends IntegrationTestSupport {

  @Autowired private CategoryRepository categoryRepository;
  @Autowired(required = false) private ItemRepository itemRepository;
  @Autowired(required = false) private InterestRepository interestRepository;
  @Autowired(required = false) private UserRepository userRepository; // só se for apagar users

  @BeforeEach
  void cleanAndSeed() {
    // Limpeza na ordem correta (se existirem)
    if (interestRepository != null) interestRepository.deleteAll();
    if (itemRepository != null) itemRepository.deleteAll();
    categoryRepository.deleteAll();
    // if (userRepository != null) userRepository.deleteAll(); // use se necessário

    // Seed
    categoryRepository.save(Category.builder().name("Roupas").slug("roupas").build());
    categoryRepository.save(Category.builder().name("Eletrônicos").slug("eletronicos").build());
  }

  @Test
  void shouldListCategories() throws Exception {
    mockMvc.perform(get("/api/categories").accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$[0].id").exists())
      .andExpect(jsonPath("$[0].name").exists());
  }
}

