package com.github.taefi.signals.core;

import com.fasterxml.jackson.databind.node.IntNode;

public class NumberSignal extends SignalQueue<IntNode> {

    public NumberSignal(int defaultValue) {
        super(IntNode.valueOf(defaultValue));
    }

}
