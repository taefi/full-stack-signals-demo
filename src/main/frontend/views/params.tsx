import {ViewConfig} from "@vaadin/hilla-file-router/types.js";
import {effect, NumberSignal, signal} from "@vaadin/hilla-react-signals";
import {NumberSignalService} from "Frontend/generated/endpoints.js";
import {Button} from "@vaadin/react-components/Button.js";

export const config: ViewConfig = {
  menu: {order: 5, icon: 'vaadin:bell', title: 'Signals with Params'},
  title: 'Signals with Params'
};

const isHigh = signal(true);

let sharedValue: NumberSignal;
effect(() => {
  sharedValue = NumberSignalService.sharedValue(isHigh.value, "a.valid@email.com");
});

export default function params() {
  return (
    <div>
      <h3>{isHigh.value ? 'High' : 'Low'} Value: {sharedValue.value}</h3>
      <Button onClick={() => sharedValue.incrementBy(isHigh.value ? 1 : -1)}>{isHigh.value ? 'Increase' : 'Decrease'}</Button>
      <br/>
      <Button onClick={() => isHigh.value = !isHigh.value}>Toggle High/Low</Button>
    </div>
  );
}
