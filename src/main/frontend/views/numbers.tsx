import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button } from '@vaadin/react-components/Button.js';
import { MySignalProviderService } from "Frontend/helper/MySignalProviderService";
import { VerticalLayout } from "@vaadin/react-components/VerticalLayout";

export const config: ViewConfig = {
  menu: { order: 0, icon: 'vaadin:bell', title: 'Number Signal'},
  title: 'Number Signal'
};

const counter = MySignalProviderService.counter();
const sharedValue = MySignalProviderService.sharedValue();

export default function NumberSignalView() {

  return (
    <VerticalLayout theme='padding'>
      <div>
        <span style={{paddingRight: '10px'}}>Shared value: {sharedValue}</span>
        <Button onClick={() => sharedValue.value += 2}>
          Increase by 2
        </Button>
      </div>
      <div>
        <span style={{paddingRight: '10px'}}>Counter value: {counter}</span>
        <Button onClick={() => counter.value++}>
          Increment
        </Button>
      </div>
      <Button onClick={() => {
        sharedValue.value = 0.5;
        counter.value = 0
      }}>Reset</Button>
    </VerticalLayout>
  );
}
