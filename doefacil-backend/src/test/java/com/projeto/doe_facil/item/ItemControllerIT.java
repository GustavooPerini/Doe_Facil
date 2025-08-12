package com.projeto.doe_facil.item;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projeto.doe_facil.model.Category;
import com.projeto.doe_facil.repository.CategoryRepository;
import com.projeto.doe_facil.repository.InterestRepository;
import com.projeto.doe_facil.repository.ItemRepository;
import com.projeto.doe_facil.support.IntegrationTestSupport;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ItemControllerIT extends IntegrationTestSupport {

  @Autowired private CategoryRepository categoryRepository;
  @Autowired private ItemRepository itemRepository;
  @Autowired(required = false) private InterestRepository interestRepository;
  @Autowired private ObjectMapper om;

  Long categoryId;

  @BeforeEach
  void setup() {
    if (interestRepository != null) interestRepository.deleteAll();
    itemRepository.deleteAll();
    categoryRepository.deleteAll();

    categoryId = categoryRepository
      .save(Category.builder().name("Móveis").slug("moveis").build())
      .getId();
  }

  private String registerAndGetToken(String name, String email) throws Exception {
    String registerJson = "{\"name\":\"" + name + "\",\"email\":\"" + email + "\",\"password\":\"123456\"}";
    var res = mockMvc.perform(post("/auth/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(registerJson))
      .andReturn().getResponse().getContentAsString();
    JsonNode node = om.readTree(res);
    return node.get("token").asText();
  }

  @Test
  void listItemsPublic() throws Exception {
    mockMvc.perform(get("/api/items"))
      .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isOk());
  }

  @Test
  void createItem_withAuth_shouldReturn201() throws Exception {
    var token = registerAndGetToken("Dono", "dono@test.com");
    String body = "{\"title\":\"Sofá 3 lugares\",\"description\":\"ok\",\"categoryId\":" + categoryId +
                  ",\"city\":\"Vitória\",\"state\":\"ES\"}";

    var res = mockMvc.perform(post("/api/items")
        .header("Authorization", "Bearer " + token)
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
      .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isCreated())
      .andReturn();

    var json = om.readTree(res.getResponse().getContentAsString());
    assertThat(json.get("title").asText()).isEqualTo("Sofá 3 lugares");
    assertThat(json.get("category").asText()).isEqualTo("Móveis");
    assertThat(json.get("status").asText()).isEqualTo("AVAILABLE");
  }

  @Test
  void createItem_withoutAuth_shouldReturn403() throws Exception {
    String body = "{\"title\":\"Cadeira\",\"description\":\"ok\",\"categoryId\":" + categoryId +
                  ",\"city\":\"Vitória\",\"state\":\"ES\"}";

    mockMvc.perform(post("/api/items")
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
      .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isForbidden());
  }

  @Test
  void createItem_missingCategory_shouldReturn400() throws Exception {
    var token = registerAndGetToken("Dono", "dono2@test.com");
    String invalid = "{\"title\":\"Cadeira\",\"description\":\"ok\",\"city\":\"Vitória\",\"state\":\"ES\"}";

    mockMvc.perform(post("/api/items")
        .header("Authorization", "Bearer " + token)
        .contentType(MediaType.APPLICATION_JSON)
        .content(invalid))
      .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isBadRequest());
  }
}
