package com.pm.notes_service.User.service;

import com.pm.notes_service.User.dto.MailBody;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("spring.mail.username")
    private String myEnvVariable;



    public void sendSimpleMessage(MailBody mailBody) {
        System.out.println("TO      = " + mailBody.to());
        System.out.println("SUBJECT = " + mailBody.subject());
        System.out.println("TEXT    = " + mailBody.text());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());
        message.setFrom(myEnvVariable);
        mailSender.send(message);
        System.out.println("EMAIL SEND SUCCESSFULLY");
    }
}
