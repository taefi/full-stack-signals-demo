package com.github.taefi.services;

import com.github.taefi.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ListSignal;
import com.vaadin.hilla.signals.operation.ValidationResult;

@BrowserCallable
@AnonymousAllowed
public class TodoService {

    record TodoItem(String text, boolean done) {}

    private final ListSignal<TodoItem> todoItems = new ListSignal<>(TodoItem.class)
            .withInsertionValidator(operation ->
                    operation.value().text().length() <= 5 ?
                            ValidationResult.ok() :
                            ValidationResult.rejected("Long todo items are not allowed"));
    private final ListSignal<TodoItem> adminSignal = todoItems
            .withRemovalValidator(operation ->
                    ValidationResult.rejected("Removing todo items is not allowed"));
//    private final ListSignal<TodoItem> userSignal = adminSignal
//            .withInsertionValidator(operation ->
//                    ValidationResult.rejected("Read-only todo list"));
    private final ListSignal<TodoItem> userSignal = todoItems.asReadOnly();

    private final AuthenticatedUser authenticatedUser;

    public TodoService(AuthenticatedUser authenticatedUser) {
        this.authenticatedUser = authenticatedUser;
    }

    public ListSignal<TodoItem> todoItems() {
        if (isAdmin()) {
            return adminSignal;
        }
        return userSignal;
    }

    private boolean isAdmin() {
        return authenticatedUser.get().isPresent()
                && authenticatedUser.get().get()
                    .getRoles().stream()
                    .anyMatch(role -> "ADMIN".equals(role.name()));
    }
}
