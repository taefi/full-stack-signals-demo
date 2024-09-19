package com.github.taefi.services;

import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@BrowserCallable
public class TestFlux {

    @RolesAllowed("ADMIN")
    public Flux<String> adminMessages() {
        final var messages = List.of("Hello", "from", "endpoint", "secured", "by", "@RolesAllowed(\"ADMIN\")", "!", " ");
        return Flux.interval(Duration.ofSeconds(1)).onBackpressureDrop()
                .map(i -> messages.get((int)(i % messages.size())));
    }

    @PermitAll
    public Flux<String> userMessages() {
        final var messages = List.of("Hello", "from", "endpoint", "secured", "by", "@PermitAll", "!", " ");
        return Flux.interval(Duration.ofSeconds(1)).onBackpressureDrop()
                .map(i -> messages.get((int)(i % messages.size())));
    }
}
