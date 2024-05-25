package com.github.taefi.signals.core;

import com.fasterxml.jackson.databind.node.IntNode;
import com.vaadin.hilla.Nullable;
import reactor.core.publisher.Flux;

import java.util.UUID;

public class NumberSignal extends SignalQueue<IntNode> {

    public NumberSignal(int defaultValue) {
        super(IntNode.valueOf(defaultValue));
    }

}
