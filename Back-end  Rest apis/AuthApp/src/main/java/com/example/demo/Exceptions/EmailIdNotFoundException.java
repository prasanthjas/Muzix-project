package com.example.demo.Exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason="Email-Id not found exception",code = HttpStatus.NOT_FOUND)
public class EmailIdNotFoundException extends Exception{
}

