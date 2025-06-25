package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.signals.ValueSignal;
import org.springframework.context.annotation.DependsOn;

@DependsOn("hillaSignalsHandler")
@BrowserCallable
@AnonymousAllowed
public class NewSharedValueService {
    private final ValueSignal<String> stringValueSignal = new ValueSignal<>("5");

    public ValueSignal<String> sharedStringSignal() {
        return stringValueSignal;
    }
}
