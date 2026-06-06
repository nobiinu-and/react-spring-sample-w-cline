package com.example.demo;

import com.example.demo.entity.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(MessageRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Message message = new Message();
                message.setContent("Hello, World! from PostgreSQL");
                repository.save(message);
            }
        };
    }
}
