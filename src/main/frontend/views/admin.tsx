import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {TestFlux} from "Frontend/generated/endpoints.js";
import {signal} from "@vaadin/hilla-react-signals";

export const config: ViewConfig = {
  menu: { order: 0, icon: 'vaadin:user-star' },
  title: 'Admin',
  // rolesAllowed: ['ADMIN'],
};

const messages = signal<string[]>([]);

const subscription = TestFlux.adminMessages().onNext((newMessage) => {
  if (messages.value.length === 7) {
    messages.value = [];
  } else {
    messages.value = [...messages.value, newMessage];
  }
}).onError(() => { messages.value = ['Could not connect to the flux endpoint.'] });

export default function AdminView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: '200px' }} src="images/empty-plant.png" />
      <h4>Message to the admin should appear here:</h4>
      <br/>
      <h2>{messages.value.join(' ')}</h2>
    </div>
  );
}
