package com.github.taefi.services;

import com.github.taefi.data.User;
import com.github.taefi.security.AuthenticatedUser;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ListSignal;
import com.vaadin.hilla.signals.operation.ListInsertOperation;
import com.vaadin.hilla.signals.operation.ListRemoveOperation;
import com.vaadin.hilla.signals.operation.ValidationResult;
import jakarta.annotation.security.PermitAll;

import java.time.LocalDateTime;

@BrowserCallable
@PermitAll
public class ChatService {
    public record Message(String text, String author, LocalDateTime timestamp) {}

    private final ListSignal<Message> chatSignal = new ListSignal<>(Message.class)
            .withOperationValidator(operation -> {
                if (operation instanceof ListInsertOperation<Message> insertOp) {
                    return insertOp.value().text().toLowerCase().contains("bad") ?
                            ValidationResult.reject("Bad words are not allowed") :
                            ValidationResult.allow();
                }
                return ValidationResult.allow();
            });
    private final ListSignal<Message> adminSignal = chatSignal
            .withOperationValidator(operation -> {
                if (operation instanceof ListRemoveOperation<Message>) {
                    return ValidationResult.reject("Removing messages is not allowed");
                }
                return ValidationResult.allow();
            });

    private final ListSignal<Message> userSignal = chatSignal.asReadonly();

    private final AuthenticatedUser authenticatedUser;

    public ChatService(AuthenticatedUser authenticatedUser) {
        this.authenticatedUser = authenticatedUser;
    }

    private final ListSignal<User> joinedUsers = new ListSignal<>(User.class);

    public ListSignal<Message> chatChannel() {
        if (authenticatedUser.get().isPresent()) {
            if (isAdmin()) {
                return adminSignal;
            }
        }
        return userSignal;
    }

    public ListSignal<User> joinedUsers() {
        return joinedUsers;
    }

    private boolean isAdmin() {
        if (authenticatedUser.get().isEmpty()) {
            return false;
        }
        return authenticatedUser.get().get()
                .getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.name()));
    }
}
