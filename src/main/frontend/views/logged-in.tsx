import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {signal} from "@vaadin/hilla-react-signals";
import {TestFlux} from "Frontend/generated/endpoints.js";

export const config: ViewConfig = {
  menu: { order: 1, icon: 'vaadin:user-check' },
  title: 'Logged In',
  // loginRequired: true,
};

const messages = signal<string[]>([]);

const subscription = TestFlux.userMessages().onNext((newMessage) => {
  if (messages.value.length === 7) {
    messages.value = [];
  } else {
    messages.value = [...messages.value, newMessage];
  }
}).onError(() => { messages.value = ['Could not connect to the flux endpoint.'] });


export default function LoggedInView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{width: '200px'}} src="images/empty-plant.png"/>
      <h4>Message to the logged-in user should appear here:</h4>
      <br/>
      <h2>{messages.value.join(' ')}</h2>
    </div>
  );
}
