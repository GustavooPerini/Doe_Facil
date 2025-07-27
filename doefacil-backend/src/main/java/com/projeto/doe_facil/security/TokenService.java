package com.projeto.doe_facil.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.projeto.doe_facil.model.UserModel;

/**
 * Serviço responsável por toda regra de negócio relacionado ao token.
 * @author Gustavo Perini
 */
@Service
public class TokenService {
    
    /**
     * Secret-key para gerar o token.
     */
    @Value("${api.security.token.secret}")
    private String secret;

    /**
     * Método que gera um JWT token com base no login do usuário.
     * @param user Um usário.
     * @return O token gerado.
     */
    public String generateToken(UserModel user) {
        try{

            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                            .withIssuer("auth-api")
                            .withSubject(user.getLogin())
                            .withExpiresAt(this.genExpirationDate())
                            .sign(algorithm);
            return token;
        }catch(JWTCreationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }

    /**
     * Verifica se um dado token é válido.
     * @param token Um token.
     * @return O subject (login do usuário) do token.
     */
    public String validateToken(String token) {
        try {

            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch(JWTVerificationException exception) {
            return "";
        }
    }

    /**
     * Função auxiliar que gera o tempo de expiração do token.
     * @return O tempo de expiração do token.
     */
    private Instant genExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

}
