package com.projeto.doe_facil.controller;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.doe_facil.model.User;
import com.projeto.doe_facil.repository.UserRepository;
import com.projeto.doe_facil.service.EmailService;

@RestController
public class EmailController {
    
    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/auth/password-recovery")
    public String passwordRecovery (@RequestBody Map <String, String> emailMap) {
        
        String email = emailMap.get("email");

        User user;

        try {
            user = userRepository.findByEmail(email).get();
            if (user == null) {
                return "{\"status\": \"user-not-registered\"}";
            }
        } catch (Exception e) {
            return "{\"status\": \"database-problem\"}";
        }

        String name = user.getName();
        String login = user.getEmail();
        String password = passwordGenerate();
        String subject = "Recuperação de email - Doe Fácil";
        String msg = "Olá " + name + ",\nvocê esqueceu sua senha, certo?\n"
                + "Tudo bem, geramos uma nova para você!\n\nLogin: " + login + "\nSenha: " + password
                + "\n\nAgora entre no sistema e troque por uma de sua preferência (e que seja fácil de lembrar)"
                + "\nAté a próxima";

        user.setPassword(new BCryptPasswordEncoder().encode(password));

        try {
            userRepository.save(user);
        } catch (Exception e) {
            return "{\"status\": \"database-problem\"}";
        }

        return this.emailService.sendEmailText(email, subject, msg);
    }

    private String passwordGenerate() {
        Random rand = new Random();
        char [] carcteres = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm".toCharArray();

        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 8; i++) {
            int pos = rand.nextInt (carcteres.length);
            sb.append (carcteres[pos]);
        }
        return sb.toString();
    }
}
