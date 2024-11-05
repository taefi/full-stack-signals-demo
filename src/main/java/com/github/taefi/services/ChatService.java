package com.github.taefi.services;

import com.github.taefi.data.User;
import com.github.taefi.security.AuthenticatedUser;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ListSignal;
import com.vaadin.hilla.signals.operation.ValidationResult;
import jakarta.annotation.security.PermitAll;

@BrowserCallable
@PermitAll
public class ChatService {
    public record Message(String text, String author) {}

    private final ListSignal<Message> chatSignal = new ListSignal<>(Message.class)
            .withInsertionValidator(operation ->
                    operation.value().text().toLowerCase().contains("bad") ?
                            ValidationResult.rejected("Bad words are not allowed") :
                            ValidationResult.ok());
    private final ListSignal<Message> adminSignal = chatSignal
            .withRemovalValidator(operation ->
                    ValidationResult.rejected("Removing messages is not allowed"));
    private final ListSignal<Message> userSignal =
            adminSignal.withInsertionValidator(operation ->
                    ValidationResult.rejected("Read-only chat channel"));

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
        return authenticatedUser.get().get()
                .getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.name()));
    }
}
