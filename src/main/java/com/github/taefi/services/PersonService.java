package com.github.taefi.services;

import com.github.taefi.data.Person;
import com.github.taefi.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.NumberSignal;
import com.vaadin.hilla.signals.ValueSignal;
import com.vaadin.hilla.signals.ListSignal;
import com.vaadin.hilla.signals.operation.IncrementOperation;
import com.vaadin.hilla.signals.operation.SetValueOperation;
import com.vaadin.hilla.signals.operation.ValidationResult;
import org.jspecify.annotations.Nullable;

import java.time.LocalDate;

@AnonymousAllowed
@BrowserCallable
public class PersonService {

    private final ValueSignal<String> loremIpsumSignal = new ValueSignal<>("Lorem", String.class);
    private final ValueSignal<Person> personSignal = new ValueSignal<>(new Person("John Doe", LocalDate.of(1980, 2, 15)), Person.class);
    private final ValueSignal<Person> userSignal = personSignal.withOperationValidator(
            operation -> {
                if (operation instanceof SetValueOperation<Person> oper) {
                    return oper.value().getBirthDate().isBefore(LocalDate.of(1970, 1, 1)) ?
                            ValidationResult.reject("Birthdate before '1970-01-01' is not allowed") :
                            ValidationResult.allow();
                }
                return ValidationResult.allow();
            });

    NumberSignal voteSignal = new NumberSignal() // <1>
        .withOperationValidator(operation -> { // <2>
            if (operation instanceof IncrementOperation increment) { // <3>
                if (Math.abs(increment.value()) == 1.0) {
                    return ValidationResult.allow(); // <4>
                }
                return ValidationResult.reject("Only up / down vote by 1 is allowed"); // <5>
            }
            return ValidationResult.reject("Invalid Operation"); // <6>
        });

    private final ValueSignal<Person[]> personArrayValueSignal = new ValueSignal<>(new Person[] { new Person("John Doe",LocalDate.of(1980, 2, 15)) }, Person[].class);

    private final AuthenticatedUser authenticatedUser;

    public PersonService(AuthenticatedUser authenticatedUser) {
        this.authenticatedUser = authenticatedUser;
    }

    private final ListSignal<Person> personListSignal = new ListSignal<>(Person.class);

    public ValueSignal<@Nullable Person> personSignalNullable(boolean isAdult) {
        if (isAdmin()) {
            return personSignal;
        }
        return userSignal;
    }

    public ValueSignal<Person> personSignalNotNull() {
        if (isAdmin()) {
            return personSignal;
        }
        return userSignal;
    }

    public ValueSignal<Person[]> personArraySignal() {
        return personArrayValueSignal;
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

