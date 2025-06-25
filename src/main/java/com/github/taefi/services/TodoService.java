package com.github.taefi.services;

import com.github.taefi.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ListSignal;
import com.vaadin.hilla.signals.operation.ListInsertOperation;
import com.vaadin.hilla.signals.operation.ListRemoveOperation;
import com.vaadin.hilla.signals.operation.ValidationResult;

@BrowserCallable
@AnonymousAllowed
public class TodoService {

    record TodoItem(String text, boolean done) {}

    private final ListSignal<TodoItem> todoItems = new ListSignal<>(TodoItem.class)
            .withOperationValidator(operation -> {
                if (operation instanceof ListInsertOperation<TodoItem> insertOp) {
                    return insertOp.value().text().length() <= 5 ?
                            ValidationResult.allow() :
                            ValidationResult.reject("Long todo items are not allowed");
                }
                return ValidationResult.allow();
            });

    private final ListSignal<TodoItem> adminSignal = todoItems
            .withOperationValidator(operation -> {
                if (operation instanceof ListRemoveOperation<TodoItem> removeOp) {
                    return ValidationResult.reject("Removing todo items is not allowed");
                }
                return ValidationResult.allow();
            });

    private final ListSignal<TodoItem> userSignal = todoItems.asReadonly();

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
