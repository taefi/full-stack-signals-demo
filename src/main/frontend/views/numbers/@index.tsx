import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button } from '@vaadin/react-components/Button.js';
import { GeneratedCounterService as CounterService } from 'Frontend/lib/generated/GeneratedCounterService';
import {HorizontalLayout} from "@vaadin/react-components";

export const config: ViewConfig = {
  menu: { order: 0, icon: 'vaadin:bell', title: 'Number Signal'},
  title: 'Number Signal'
};

const counter = await CounterService.counter();

export default function NumberSignalView() {

  return (
    <HorizontalLayout theme='spacing'>
      <Button onClick={() => counter.increment()}>
        Click count: { counter }
      </Button>
      <Button onClick={() => counter.value = 0}>Reset</Button>
    </HorizontalLayout>
  );
}
