package com.example.demo.Services;

import com.example.demo.Models.EmailData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendEmail(EmailData emailData) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setFrom(sender);
            email.setTo(emailData.getReciever());
            email.setSubject(emailData.getSubject());
            email.setText(emailData.getMessageBody());
            mailSender.send(email);
            return "Email sent successfully to: " + emailData.getReciever();
        } catch (Exception e) {
            return "Email failed to send";
        }
    }

}
