package com.example.demo.controller;

import com.example.demo.entity.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class HelloController {

    private final MessageRepository messageRepository;

    public HelloController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @PostMapping("/hello")
    public Map<String, String> hello(@RequestParam(required = false) String name) {
        String msg = (name != null && !name.isBlank()) ? "Hello " + name + "!" : "Hello World!";
        Message message = new Message();
        message.setContent(msg);
        message.setCreatedAt(LocalDateTime.now());
        messageRepository.save(message);
        return Map.of("message", msg);
    }

    @GetMapping("/hello/history")
    public List<Map<String, String>> history() {
        return messageRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(m -> Map.of("message", m.getContent()))
                .collect(Collectors.toList());
    }
}
