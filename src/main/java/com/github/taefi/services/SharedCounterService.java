package com.github.taefi.services;

import com.github.taefi.signals.core.NumberSignal;
import com.github.taefi.signals.core.SignalsRegistry;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.beans.factory.annotation.Autowired;

@AnonymousAllowed
@BrowserCallable
public class SharedCounterService {

    private final NumberSignal counter = new NumberSignal(0);

    private final NumberSignal anotherCounter = new NumberSignal(20);

    @Autowired
    private SignalsRegistry registry; // TODO: This should be in EndpointInvoker

    public NumberSignal counter() {
        /*
         * Register the counter signal if it is not already registered.
         * TODO: This should be in EndpointInvoker
         */
        if (!registry.contains(counter.getId())) {
            registry.register(counter);
        }
        return counter;
    }

    public NumberSignal anotherCounter() {
        /*
         * Register the counter signal if it is not already registered.
         * TODO: This should be in EndpointInvoker
         */
        if (!registry.contains(anotherCounter.getId())) {
            registry.register(anotherCounter);
        }
        return anotherCounter;
    }
}
