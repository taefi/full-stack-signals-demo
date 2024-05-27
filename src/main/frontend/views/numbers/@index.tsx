import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button } from '@vaadin/react-components/Button.js';
import { GeneratedCounterService as CounterService } from 'Frontend/lib/generated/GeneratedCounterService';

export const config: ViewConfig = {
  menu: { order: 0, icon: 'vaadin:bell', title: 'Number Signal'},
  title: 'Number Signal'
};

const counter = await CounterService.counter();

export default function NumberSignalView() {

  return (
    <Button onClick={() => counter.update((value) => value + 1)}>
      Click count: { counter }
    </Button>
  );
}
