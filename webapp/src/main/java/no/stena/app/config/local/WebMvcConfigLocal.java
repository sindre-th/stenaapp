package no.stena.app.config.local;

import no.stena.app.config.WebMvcConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Profile("local")
@Configuration
public class WebMvcConfigLocal extends WebMvcConfig {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("********************************* CORS ************************************");
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
                .allowedOrigins("http://localhost:3000/");
    }
}
