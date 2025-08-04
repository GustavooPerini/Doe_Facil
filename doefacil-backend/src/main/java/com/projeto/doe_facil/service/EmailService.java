package com.projeto.doe_facil.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String systemEmail;

    public String sendEmailText(String receiver, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(systemEmail);
        message.setTo(receiver);
        message.setSubject(subject);
        message.setText(text);

        try {
            javaMailSender.send(message);
            return "sent";
        } catch(Exception e) {
            return "not-sent";
        }
    }
}
