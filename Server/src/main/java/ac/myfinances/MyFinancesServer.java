package ac.myfinances;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.jackson.JsonNodeValueReader;
import org.openapitools.jackson.nullable.JsonNullableModule;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

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
     * Create a method for the model Mapper.
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        Converter<Map<String, String>, String> mapToJsonString = new AbstractConverter<Map<String, String>, String>() {
            ObjectMapper mapper = new ObjectMapper();
            protected String convert(Map<String, String> source) {
                String value = "{}";
                try {
                    value = (source != null) ? this.mapper.writeValueAsString(source) : "{}";
                } catch (IOException ioe) {
                    value = "{}";
                }
                return value;
            }
        };

        mapper.addConverter(mapToJsonString);
        mapper.getConfiguration().addValueReader(new JsonNodeValueReader());
        return mapper;
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

            @Override
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

    @Bean
    public Module jsonNullableModule() {
        return new JsonNullableModule();
    }

}
