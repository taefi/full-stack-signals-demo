package com.github.taefi.signals.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import reactor.core.publisher.Flux;

import java.util.UUID;

@AnonymousAllowed
@BrowserCallable
public class SignalsHandler {

    private final SignalsRegistry registry;
    private final JsonEventMapper jsonEventMapper;

    public SignalsHandler(SignalsRegistry registry, ObjectMapper mapper) {
        this.registry = registry;
        this.jsonEventMapper = new JsonEventMapper(mapper);
    }

    public Flux<String> subscribe(UUID signalId, @Nullable UUID continueFrom) {
        return registry.get(signalId).subscribe(continueFrom).map(jsonEventMapper::toJson);
    }

    public void update(UUID signalId, String event) {
        registry.get(signalId).submit(jsonEventMapper.fromJson(event));
    }

}
