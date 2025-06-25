import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import HelloView from "Frontend/views/hello.js";

export const config: ViewConfig = {
  menu: { exclude: true }
}

export default function Index() {
  return HelloView();
}
