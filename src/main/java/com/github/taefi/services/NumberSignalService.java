package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.signals.NumberSignal;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ValueSignal;
import jakarta.validation.constraints.Email;

@AnonymousAllowed
@BrowserCallable
public class NumberSignalService {

    private final NumberSignal counter = new NumberSignal();

    private final NumberSignal highValue = new NumberSignal(100.0);
    private final NumberSignal lowValue = new NumberSignal(-100.0);

    private final ValueSignal<Boolean> startTrigger = new ValueSignal<>(false, Boolean.class);

    public NumberSignal counter() {
        return counter;
    }

    public NumberSignal sharedValue(boolean isHigh, @Email String email) {
        return isHigh ? highValue : lowValue;
    }

    public ValueSignal<@Nullable Boolean> startTrigger() {
        return startTrigger;
    }
}
