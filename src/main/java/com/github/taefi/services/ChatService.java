package com.github.taefi.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.signals.ListSignal;

@BrowserCallable
@AnonymousAllowed
public class ChatService {
    record Message(String text, String author) {}

    private final ListSignal<Message> chatChannel = new ListSignal<>(Message.class);

    public ListSignal<Message> chatChannel() {
        return chatChannel;
    }

    public ListSignal<Message> chatChannelByName(String channelName) {
        return chatChannel;
    }
}
