package ac.myfinances;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.util.Map;

@SpringBootApplication
@ComponentScan(basePackages = {"org.openapitools", "ac.myfinances"})
public class MyFinancesServer implements CommandLineRunner{
    @Override
    public void run(String... arg0) throws Exception {
        if (arg0.length > 0 && arg0[0].equals("exitcode")) {
            throw new ExitException();
        }
    }

    public static void main(String[] args) throws Exception {
        new SpringApplication(MyFinancesServer.class).run(args);
    }

    static class ExitException extends RuntimeException implements ExitCodeGenerator {
        private static final long serialVersionUID = 1L;

        @Override
        public int getExitCode() {
            return 10;
        }

    }

    /**
     * Create a method for the cors Configurer.
     */
    @Bean
    @ConditionalOnProperty(name = "ac.cors.enabled")
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Value("${ac.cors.api.allowed-origins}")
            private String apiAllowedOrigins;

            @Value("${ac.cors.api.allowed-headers}")
            private String apiAllowedHeaders;

            @Value("${ac.cors.api.allowed-methods}")
            private String apiAllowedMethods;

            @Value("${ac.cors.api.allow-credentials}")
            private Boolean apiAllowCredentials;

            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(this.apiAllowedOrigins.split(","))
                        .allowCredentials(this.apiAllowCredentials)
                        .allowedMethods(this.apiAllowedMethods.split(","))
                        .allowedHeaders(this.apiAllowedHeaders.split(","));
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/static/**")
                        .addResourceLocations("/static/");
            }
        };
    }


}
