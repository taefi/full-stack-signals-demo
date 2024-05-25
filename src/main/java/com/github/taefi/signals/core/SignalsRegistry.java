package com.github.taefi.signals.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.WeakHashMap;

@Component
public class SignalsRegistry {

    private static final Logger LOGGER = LoggerFactory.getLogger(SignalsRegistry.class);
    private final WeakHashMap<UUID, SignalQueue<?>> signals = new WeakHashMap<>();
    private static ApplicationContext applicationContext;

    public synchronized void register(SignalQueue<?> signal) {
        signals.put(signal.getId(), signal);
        LOGGER.debug("Registered signal: {}", signal.getId());
    }

    public synchronized SignalQueue<?> get(UUID uuid) {
        return signals.get(uuid);
    }

    public synchronized void remove(UUID uuid) {
        signals.remove(uuid);
        LOGGER.debug("Removed signal: {}", uuid);
    }

    public synchronized void clear() {
        signals.clear();
        LOGGER.debug("Cleared all signal instances");
    }

    public synchronized boolean contains(UUID uuid) {
        return signals.containsKey(uuid);
    }

    public synchronized boolean isEmpty() {
        return signals.isEmpty();
    }

}
