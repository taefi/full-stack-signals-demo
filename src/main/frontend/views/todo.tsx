import {TodoService} from "Frontend/generated/endpoints.js";
import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";
import {HorizontalLayout} from "@vaadin/react-components";
import {Button} from "@vaadin/react-components/Button.js";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 5.6, icon: 'vaadin:cubes' },
  title: 'Records as Values',
};

const todoItemSignal = TodoService.todoItemSignal({defaultValue: {text: '', done: false}});

export default function TodoView(){

  return (
    <VerticalLayout theme="padding">
      <HorizontalLayout theme="spacing padding" style={{alignItems: 'BASELINE'}}>
        <span>{`${todoItemSignal.value.text}: ${todoItemSignal.value.done ? 'done' : 'remaining'}`}</span>
        <Button onClick={() =>
          todoItemSignal.value = {text: todoItemSignal.value.text, done: !todoItemSignal.value.done}}
        >Toggle Done Status</Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}
