package com.github.taefi.services;

import com.github.taefi.data.Person;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.signals.ValueSignal;

@AnonymousAllowed
@BrowserCallable
public class PersonService {

    private final ValueSignal<Person> personSignal = new ValueSignal<>(new Person("John Doe", 30), Person.class);

    public ValueSignal<@Nullable Person> personSignal(boolean isAdult) {
        return personSignal;
    }

}
