import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import {effect, signal, type ValueSignal} from '@vaadin/hilla-react-signals';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Button } from '@vaadin/react-components/Button.js';
import { useAuth } from 'Frontend/util/auth.js';
import { Suspense, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import '@vaadin/icons';
import {MenuService} from "Frontend/generated/endpoints.js";

const defaultTitle = document.title;
const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});

// Publish for Vaadin to use
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

// const selectMenu: ValueSignal<string | undefined> = MenuService.selectedMenuSignal();

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? defaultTitle;
  const navigate = useNavigate();
  const location = useLocation();

  /*useEffect(() => {
    documentTitleSignal.value = currentTitle;
    navigate(selectMenu.value!);
  }, [currentTitle, selectMenu.value]);*/

  const { state, logout } = useAuth();
  const profilePictureUrl =
    state.user && state.user.profilePicture &&
    `data:image;base64,${btoa(
      state.user.profilePicture.reduce((str, n) => str + String.fromCharCode((n + 256) % 256), ''),
    )}`;
  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <span className="font-semibold text-l">My App</span>
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {createMenuItems().map(({ to, title, icon }) => (
              <SideNavItem path={to} key={to} >
                {icon ? <Icon icon={icon} slot="prefix"></Icon> : <></>}
                {title}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
        <footer className="flex flex-col gap-s">
          {state.user ? (
            <>
              <div className="flex items-center gap-s">
                <Avatar theme="xsmall" img={profilePictureUrl} name={state.user.name} />
                {state.user.name}
              </div>
              <Button
                onClick={() => {
                  logout();
                  // document.location.reload();
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </footer>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h1 slot="navbar" className="text-l m-0">
        {documentTitleSignal}
      </h1>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
