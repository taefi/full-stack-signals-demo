import {type ListSignal, type Signal, useSignal, type ValueSignal} from "@vaadin/hilla-react-signals";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";
import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";
import {HorizontalLayout, Icon, TextArea} from "@vaadin/react-components";
import {Button} from "@vaadin/react-components/Button";
import {TextField} from "@vaadin/react-components/TextField";


import type Message from "Frontend/generated/com/github/taefi/services/ChatService/Message.js";
import {useEffect} from "react";
import {ChatService} from "Frontend/generated/endpoints.js";

export const config: ViewConfig = {
  menu: { order: 5.7, icon: 'vaadin:chat' },
  title: 'Chat',
};

const chatChannel: ListSignal<Message> = ChatService.chatChannel();

function MessageEditor({message, onRemove, isMyMessage}: { message: ValueSignal<Message>, onRemove: (signal: ValueSignal<Message>) => void, isMyMessage: boolean }) {
  return (
    <HorizontalLayout theme='spacing' style={{ alignItems: 'BASELINE' }}>
      <TextField readonly={true} label={message.value.author} value={message.value.text} />
      <Button hidden={!isMyMessage} theme="icon error" onClick={() => onRemove(message)}><Icon icon="vaadin:trash" /></Button>
    </HorizontalLayout>
  );
}

function EnterChatComponent({ username, enteredChat } : { username: Signal<string>, enteredChat: Signal<boolean> }) {
  const tempUsername = useSignal('');
  useEffect(() => {
    sessionStorage.getItem('LIST-SIGNAL:username')
      ? tempUsername.value = sessionStorage.getItem('LIST-SIGNAL:username')!
      : tempUsername.value = '';
  }, []);
  return (
    <VerticalLayout theme='padding'>
      <h4>To enter the chat, please enter your username (min. 3 character): </h4>
      <HorizontalLayout theme='padding spacing' style={{ alignItems: 'BASELINE' }}>
        <TextField label='Username' value={tempUsername.value}
                   onValueChanged={(e) => {
                     tempUsername.value = e.detail.value;
                   }}/>
        <Button onClick={() => {
                    sessionStorage.setItem('LIST-SIGNAL:username', tempUsername.value);
                    username.value = tempUsername.value;
                    tempUsername.value = '';
                    enteredChat.value = true;
                }}
                disabled={tempUsername.value.length < 3}
        >Enter Chat!</Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}

function ChatComponent({ username } : { username: Signal<string> }) {
  const newMessage = useSignal<string>('');

  return (
    <VerticalLayout theme='padding'>
      <h3>Welcome {username.value}, to the Chat!</h3>
      <div>
        {chatChannel.value.length === 0
          ? <>No messages yet...</>
          : chatChannel.value.map((message, index) =>
            <MessageEditor message={message}
                           onRemove={() => chatChannel.remove(message)}
                           isMyMessage={message.value.author.toLowerCase() === username.value.toLowerCase()}
                           key={index}/>)
        }
      </div>
      <HorizontalLayout theme='spacing' style={{alignItems: 'BASELINE'}}>
        <TextArea value={newMessage.value} placeholder="Type in your message and press send..."
                  onValueChanged={(e => newMessage.value = e.detail.value)}
                  style={{height: '66px'}}/>
        <Button onClick={() => {
          chatChannel.insertLast({text: newMessage.value, author: username.value});
          newMessage.value = '';
        }} disabled={newMessage.value === ''}>Send</Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}

export default function ChatView() {
  const enteredChat = useSignal(false);
  const username = useSignal('');
  return (
    <>
    {!enteredChat.value
      ? <EnterChatComponent username={username} enteredChat={enteredChat}/>
      : <ChatComponent username={username} />
    }
    </>
  );
}