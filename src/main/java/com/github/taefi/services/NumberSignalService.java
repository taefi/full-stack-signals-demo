package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.signals.NumberSignal;
import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;

@AnonymousAllowed
@BrowserCallable
public class NumberSignalService {

    private final NumberSignal counter = new NumberSignal();

    private final NumberSignal sharedValue = new NumberSignal(0.5);

    // @RolesAllowed("ADMIN")
    public NumberSignal counter() {
        return counter;
    }

    // @PermitAll
    public NumberSignal sharedValue() {
        return sharedValue;
    }
}
