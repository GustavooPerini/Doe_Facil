package com.projeto.doe_facil.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.projeto.doe_facil.model.Category;
import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.repository.CategoryRepository;
import com.projeto.doe_facil.repository.UserRepository;

@Configuration
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User user = User.builder()
                    .name("João da Silva")
                    .email("joao@email.com")
                    .password(new BCryptPasswordEncoder().encode("123456"))
                    .role(User.Role.USER)
                    .build();
            userRepository.save(user);

            User adminUser = User.builder()
                    .name("Marcelo da Silva")
                    .email("marcelo@email.com")
                    .password(new BCryptPasswordEncoder().encode("123456"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(adminUser);
        }

        if (categoryRepository.count() == 0) {
            categoryRepository.save(Category.builder().name("Roupas").slug("roupas").build());
            categoryRepository.save(Category.builder().name("Calçados").slug("calcados").build());
            categoryRepository.save(Category.builder().name("Eletrodomésticos").slug("eletrodomesticos").build());
            categoryRepository.save(Category.builder().name("Eletrônicos").slug("eletronicos").build());
            categoryRepository.save(Category.builder().name("Livros").slug("livros").build());
            categoryRepository.save(Category.builder().name("Móveis").slug("moveis").build());
            categoryRepository.save(Category.builder().name("Materiais de escritório").slug("escritorio").build());
            categoryRepository.save(Category.builder().name("Artigos esportivos").slug("esportivos").build());
            categoryRepository.save(Category.builder().name("Outra").slug("outra").build());
        }
    }
}