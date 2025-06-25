import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";
import {TextField} from "@vaadin/react-components/TextField";
import {Button} from "@vaadin/react-components/Button";
import {HelloWorldService} from "Frontend/generated/endpoints";
import '@vaadin/icons';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import {useSignal} from "@vaadin/hilla-react-signals";
import {Icon} from "@vaadin/react-components";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 6, icon: 'vaadin:handshake' },
  title: 'Hello World',
};

export default function HelloView() {

  const name = useSignal('');
  const notifications = useSignal<string[]>([]);

  return (
    <>
      <VerticalLayout theme="padding spacing">
        <TextField
          label="Your name"
          onValueChanged={(e) => {
            name.value = e.detail.value;
          }} className="self-start"
        />
        <Button
          onClick={async () => {
            const serverResponse = await HelloWorldService.sayHello(name.value);
            notifications.value = [...notifications.value, serverResponse];
          }}
        > Say hello
          <Icon icon="lumo:play"/>
        </Button>
        <ul>
          {notifications.value.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </VerticalLayout>
    </>
  );
}
