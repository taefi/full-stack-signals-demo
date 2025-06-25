import {effect, type ListSignal, useComputed, useSignal, type ValueSignal} from "@vaadin/hilla-react-signals";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";
import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";
import {AvatarGroup, HorizontalLayout, Icon, Notification, Scroller, TextArea} from "@vaadin/react-components";
import {Button} from "@vaadin/react-components/Button";

import type Message from "Frontend/generated/com/github/taefi/services/ChatService/Message.js";

import {ChatService} from "Frontend/generated/endpoints.js";
import {useAuth} from "Frontend/util/auth.js";
import {useLayoutEffect} from "react";
import type User from "Frontend/generated/com/github/taefi/data/User.js";

export const config: ViewConfig = {
  menu: { order: 5.7, icon: 'vaadin:chat' },
  title: 'Chat',
  loginRequired: true,
};

function MessageEditor({message, onRemove, isMyMessage}: {
  message: ValueSignal<Message>,
  onRemove: (signal: ValueSignal<Message>) => void,
  isMyMessage: boolean
}) {
  return (
    <HorizontalLayout theme='spacing' style={{ alignItems: 'BASELINE' }}>
      <TextArea readonly={true}
                label={isMyMessage ? 'Me:' : message.value.author + ':'}
                value={message.value.text}
                helperText={message.value.timestamp}
      />
      <Button hidden={!isMyMessage} theme="icon error" onClick={() => onRemove(message)}><Icon icon="vaadin:trash" /></Button>
    </HorizontalLayout>
  );
}

function ChatComponent({ username } : { username: string }) {
  const newMessage = useSignal<string>('');

  return (
    <VerticalLayout theme='padding'>
      <h3>Welcome {username}!</h3>
      <span>The word "bad" is not allowed in this chat, and the message will not be accepted!</span>
      <span>But, you can be creative by saying things like "b-a-d" or "B A D"</span>
      <Scroller style={{height: '65vh',
        width: '100%',
        borderBottom: '1px solid var(--lumo-contrast-20pct)',
        borderTop: '1px solid var(--lumo-contrast-20pct)',
      }}
        scrollDirection="vertical">
        {chatChannel.value.length === 0
          ? <>No messages yet...</>
          : chatChannel.value.map((message, index) =>
            <MessageEditor message={message}
                           onRemove={() => chatChannel.remove(message)}
                           isMyMessage={message.value.author.toLowerCase() === username.toLowerCase()}
                           key={index}/>)
        }
      </Scroller>
      <HorizontalLayout theme='spacing' style={{alignItems: 'BASELINE'}}>
        <TextArea value={newMessage.value} placeholder="Type in your message and press send..."
                  onValueChanged={(e => newMessage.value = e.detail.value)}
                  style={{height: '66px'}}/>
        <Button onClick={() => {
          chatChannel.insertLast({text: newMessage.value, author: username, timestamp: new Date().toISOString()})
            .result
            .then(() => newMessage.value = '')
            .catch(() => Notification.show('The message was not accepted!'));
        }} disabled={newMessage.value === ''}>Send</Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}

function JoinedUsers() {
  const avatars = useComputed(() =>
    joinedUsers.value.map((user, index) => ({
      name: `${user.value.name}`,
      colorIndex: index,
    }))
  );

  return (
    <HorizontalLayout theme='padding'>
      <AvatarGroup items={avatars.value} theme='padding' />
    </HorizontalLayout>
  );
}

const chatChannel: ListSignal<Message> = ChatService.chatChannel();
const joinedUsers: ListSignal<User> = ChatService.joinedUsers();
const  closer = effect(() => {

});
export default function ChatView() {
  const { state, logout } = useAuth();

  useLayoutEffect(() => {
    if (!state.user) {
      return;
    }
    joinedUsers.value.filter(u => u.value.username === state.user!.username)
                        .forEach(u => joinedUsers.remove(u));
    joinedUsers.insertLast(state.user);

    return () => {
      if (state.user) {
        joinedUsers.value.filter(u => u.value.username === state.user!.username)
                            .forEach(u => joinedUsers.remove(u));
      }
    }
  }, []);

  return (
    <>
      <JoinedUsers />
      <ChatComponent username={state.user!.name!} />
    </>
  );
}
