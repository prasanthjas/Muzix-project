package com.example.demo.Services;

import com.example.demo.Models.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    public Map<String, String> generateToken(User user) {
        Map<String,String> result = new HashMap<String,String>();
        Map<String,Object> claims = new HashMap<String,Object>();
        claims.put("currentUserEmailId",user.getEmail());
        claims.put("currentUserName",user.getUsername());
        String jwt = Jwts.builder()
                .setClaims(claims)
                .setSubject("AuthToken")
                .setIssuer("auth-app")
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"AuthSecret")
                .compact();
        result.put("token",jwt);
        result.put("message","Login success");
        return result;
    }

}
