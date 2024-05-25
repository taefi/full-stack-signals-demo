import { Navigate } from "react-router-dom";
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { exclude: true }
}

export default function Index() {
  return <Navigate to="/numbers" />;
}
