package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.signals.ValueSignal;

@AnonymousAllowed
@BrowserCallable
public class CursorService {

    public record Position(int x, int y) {}

    private ValueSignal<Position> position = new ValueSignal<>(new Position(0, 0), Position.class);

    public ValueSignal<@Nullable Position> sharedCursor() {
        return position;
    }
}
