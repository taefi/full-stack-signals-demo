import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button } from '@vaadin/react-components/Button.js';
import { VerticalLayout } from "@vaadin/react-components/VerticalLayout";
import { NumberSignalService } from "Frontend/generated/endpoints.js";
import { useSignal } from "@vaadin/hilla-react-signals";
import { useEffect } from "react";

export const config: ViewConfig = {
  menu: { order: 2, icon: 'vaadin:bell', title: 'Number Signal'},
  title: 'Number Signal'
};

const counter = NumberSignalService.counter();

const votingStarted = NumberSignalService.startTrigger({defaultValue: undefined});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function NumberSignalView() {

  const numberOfSentRequests = useSignal(0);

  useEffect(() => {
    if (!votingStarted.value) {
      return;
    }
    const runWithDelay = async () => {
      for (let i = 0; i < 1000; i++) {
          counter.incrementBy(1);
          numberOfSentRequests.value++;
        await sleep(1);
      }
    };
    runWithDelay();
  }, [votingStarted.value]);

  return (
    <VerticalLayout theme='padding'>
      <div>
        <span style={{paddingRight: '10px'}}>Vote count: {counter}</span>
        <Button onClick={() => counter.value++}>
          Vote Up!
        </Button>
      </div>
      <Button onClick={() => {
        counter.value = 0;
        numberOfSentRequests.value = 0;
      }}>Reset</Button>
      <br />
      Is voting in progress: {votingStarted.value ? 'Yes' : 'No'}
      <Button onClick={() => votingStarted.value = !votingStarted.value} theme={votingStarted.value ? 'error' : ''}>{votingStarted.value ? 'Stop' : 'Start'} Voting</Button>
      <br />
      {numberOfSentRequests.value > 0 ? <span>Sent {numberOfSentRequests.value} requests</span> : ''}
    </VerticalLayout>
  );
}
