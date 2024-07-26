import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";
import {TextField} from "@vaadin/react-components/TextField";
import {Button} from "@vaadin/react-components/Button";
import {HelloWorldService} from "Frontend/generated/endpoints";
import {useState} from "react";
import {useSignal} from "@vaadin/hilla-react-signals";

export default function HelloView() {

  const name = useSignal('');
  const notifications = useSignal<string[]>([]);
  // const [name, setName] = useState('');
  // const [notifications, setNotifications] = useState([] as string[]);

  return (
    <>
      <VerticalLayout theme="padding spacing">
        <h3>Hilla View</h3>
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
        > Say hello</Button>
        {notifications.value.map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
      </VerticalLayout>
    </>
  );
}
