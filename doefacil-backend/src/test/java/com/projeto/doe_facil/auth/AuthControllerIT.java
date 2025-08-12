package com.projeto.doe_facil.auth;

import com.projeto.doe_facil.support.IntegrationTestSupport;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIT extends IntegrationTestSupport {

  @Test
  void shouldRegisterAndLogin() throws Exception {
    var register = """
      {"name":"Maria Teste","email":"maria@test.com","password":"123456"}
    """;

    mockMvc.perform(post("/auth/register")
        .contentType(MediaType.APPLICATION_JSON).content(register))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.token").exists())
      .andExpect(jsonPath("$.userId").exists())
      .andExpect(jsonPath("$.role").value("USER"));

    var login = """
      {"email":"maria@test.com","password":"123456"}
    """;

    mockMvc.perform(post("/auth/login")
        .contentType(MediaType.APPLICATION_JSON).content(login))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.token").exists());
  }

  @Test
  void shouldReturnConflictOnDuplicateEmail() throws Exception {
    var body = """
      {"name":"Joao","email":"dup@test.com","password":"123456"}
    """;
    mockMvc.perform(post("/auth/register")
        .contentType(MediaType.APPLICATION_JSON).content(body))
      .andExpect(status().isOk());

    mockMvc.perform(post("/auth/register")
        .contentType(MediaType.APPLICATION_JSON).content(body))
      .andExpect(status().isConflict());
  }
}