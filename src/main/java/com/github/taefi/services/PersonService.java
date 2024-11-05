package com.github.taefi.services;

import com.github.taefi.data.Person;
import com.github.taefi.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.signals.ValueSignal;
import com.vaadin.hilla.signals.ListSignal;
import com.vaadin.hilla.signals.operation.ValidationResult;

@AnonymousAllowed
@BrowserCallable
public class PersonService {

    private final ValueSignal<String> loremIpsumSignal = new ValueSignal<>("Lorem", String.class);
    private final ValueSignal<Person> personSignal = new ValueSignal<>(new Person("John Doe", 30), Person.class);
    private final ValueSignal<Person> userSignal = personSignal.withSetOperationValidator(
            oper -> oper.value().getAge() == 320 ?
                    ValidationResult.rejected("Age is too high") :
                    ValidationResult.ok()
    );

    private final AuthenticatedUser authenticatedUser;

    public PersonService(AuthenticatedUser authenticatedUser) {
        this.authenticatedUser = authenticatedUser;
    }

    private final ListSignal<Person> personListSignal = new ListSignal<>(Person.class);

    public ValueSignal<@Nullable Person> personSignal(boolean isAdult) {
        if (isAdmin()) {
            return personSignal;
        }
        return userSignal;
    }

    public ListSignal<Person> personListSignal() {
        return personListSignal;
    }

    public ValueSignal<String> loremIpsumSignal() {
        return loremIpsumSignal;
    }

    private boolean isAdmin() {
        return authenticatedUser.get().isPresent()
                && authenticatedUser.get().get()
                .getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.name()));
    }
}

