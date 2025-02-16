package no.stena.app.api.controller;

import no.stena.app.api.dto.TestDto;
import no.stena.app.pdf.PdfGenerator;
import no.stena.app.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    private final TestService testService;

    @Autowired
    public TestController(TestService testService) {
        this.testService = testService;
    }
    @GetMapping("/test")
    public ResponseEntity<Resource> test() throws IOException {
//        return new TestDto(1L,"Test Testesen", 44);
        //testService.opprett(new TestDto(null, "Sindre", 34));
        ByteArrayResource pdf = PdfGenerator.createPDFResource("main", Map.of("name", "world"));
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(pdf);
    }
}
