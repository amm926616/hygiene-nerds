package com.universe.hygienenerds.hygiene_nerds_backend.security;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {
        http.httpBasic(Customizer.withDefaults());
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(c -> {
                CorsConfigurationSource source = new CorsConfigurationSource() {
                @Override
                public CorsConfiguration getCorsConfiguration(
                        HttpServletRequest request
                ) {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173"));
                    config.setAllowedMethods(List.of("*"));
                    config.setAllowedHeaders(List.of("*"));
                    config.addExposedHeader("*");
                    config.setAllowCredentials(true);
                    return config;
                }
            };
            c.configurationSource(source);
        });
        http.authorizeHttpRequests(c -> {
            c.requestMatchers("/api/auth/**").permitAll();
            c.requestMatchers("/api/checkout/**").permitAll();
            c.requestMatchers("/api/products/**").permitAll();
            c.requestMatchers("/api/images/**").permitAll();
            c.requestMatchers("/api/user/**").permitAll();
            c.requestMatchers("/api/users/image/**").permitAll();
            c.anyRequest().authenticated();
        });
        return http.build();
    }
}