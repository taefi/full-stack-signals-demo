package com.github.taefi.services;

import com.github.taefi.data.User;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ListSignal;
import jakarta.annotation.security.PermitAll;

@BrowserCallable
@PermitAll
public class ChatService {
    public record Message(String text, String author) {}

    private final ListSignal<Message> chatChannel = new ListSignal<>(Message.class);

    private final ListSignal<User> joinedUsers = new ListSignal<>(User.class);

    public ListSignal<Message> chatChannel() {
        return chatChannel;
    }

    public ListSignal<User> joinedUsers() {
        return joinedUsers;
    }

    public ListSignal<Message> chatChannelByName(String channelName) {
        return chatChannel;
    }
}
