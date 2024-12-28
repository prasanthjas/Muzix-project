package com.example.demo.Utils;


import com.example.demo.Controllers.SessionController;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private SessionController sessionController;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.equals("/session/register") || path.startsWith("/search") || path.startsWith("/home") || path.startsWith("/movie")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return;
        } else {
            String token = authHeader.substring(7);
            if (!sessionController.getTokenStore().contains(token)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Token not registered");
                return;
            }
            Claims claims = Jwts.parser().setSigningKey("AuthSecret").parseClaimsJws(token).getBody();
            String emailId = (String) claims.get("currentUserEmailId");
            String name = (String) claims.get("currentUserName");

            request.setAttribute("emailId", emailId);
            request.setAttribute("userName", name);
            filterChain.doFilter(request, response);
        }
    }
}


