package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.signals.ValueSignal;

@AnonymousAllowed
@BrowserCallable
public class MenuService {

    private final ValueSignal<String> selectedMenu = new ValueSignal<>("/numbers", String.class);

    public ValueSignal<@Nullable String> selectedMenuSignal() {
        return selectedMenu;
    }
}
