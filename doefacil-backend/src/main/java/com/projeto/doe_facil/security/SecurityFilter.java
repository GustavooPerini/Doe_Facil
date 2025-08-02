package com.projeto.doe_facil.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.projeto.doe_facil.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Classe responsável por criar um filtro de segurança. Ela verifica se o usuário possui um token
 * e se está valido. Esse filtro é chamado toda vez que uma requisição é feita.
 * @author Gustavo Perini.
 */
@Component
public class SecurityFilter extends OncePerRequestFilter{

    /**
     * Serviço de token.
     */
    @Autowired
    private TokenService tokenService;

    /**
     * Repositório do usuário
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Método que implementa como o a filtragem é feita quando uma requisição é feita.
     * @param request A requisição feita ao servidor.
     * @param response A resposta que o será enviada.
     * @param filterChain A cadeia de filtros.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
 
        var token = this.recoverToken(request);
        if(token != null) {
            var login = this.tokenService.validateToken(token);
            UserDetails user = userRepository.findByLogin(login);

            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }
        filterChain.doFilter(request, response);
    }
    
    /**
     * Método que pega o token presente na requisição.
     * @param request A requisição feita ao servidor.
     * @return O token do usuário.
     */
    private String recoverToken(HttpServletRequest request) {
        
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }

    
}
