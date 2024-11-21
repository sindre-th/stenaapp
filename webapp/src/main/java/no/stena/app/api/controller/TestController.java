package no.stena.app.api.controller;

import no.stena.app.api.dto.TestDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public TestDto test() {
        return new TestDto("Test Testesen", 44);
    }
}
