package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nonnull;
import com.vaadin.hilla.signals.ValueSignal;

@BrowserCallable
public class TodoService {

    record TodoItem(String text, boolean done) {}

    private final ValueSignal<@Nonnull TodoItem> todoItemSignal = new ValueSignal<>(new TodoItem("Buy milk", false), TodoItem.class);

    @AnonymousAllowed
    public ValueSignal<@Nonnull TodoItem> todoItemSignal() {
        return todoItemSignal;
    }
}
