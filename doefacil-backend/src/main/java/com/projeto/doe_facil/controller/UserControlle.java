package com.projeto.doe_facil.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserControlle {


    @GetMapping
    public String gugu() {
        return "Gugu";
    }
}
