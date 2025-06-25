package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ValueSignal;
import jakarta.validation.constraints.NotNull;

@AnonymousAllowed
@BrowserCallable
public class CursorService {

    public record Position(@NotNull int x, @NotNull int y) {}

    private ValueSignal<Position> position = new ValueSignal<>(new Position(0, 0), Position.class);

    public ValueSignal<Position> sharedCursor() {
        return position;
    }
}
