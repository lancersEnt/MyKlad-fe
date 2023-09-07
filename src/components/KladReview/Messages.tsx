/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { Box, Stack, Toolbar } from '@mui/material';

import { useSelector } from 'react-redux';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageLeft, MessageRight } from './Message';
import { RootState } from '../../app/store';
import { Message } from '../../utils/Interfaces/Message.interface';
import { MESSAGE_CREATED } from '../../utils/GraphQL/Subscriptions';
import { GET_MESSAGE } from '../../utils/GraphQL/Queries';

interface MessagesProps {
  messages: Message[];
  boxRef: React.RefObject<HTMLDivElement>;
}
function Messages({ messages, boxRef }: MessagesProps) {
  const { kladId } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const [messagess, setmessages] = useState<Message[]>(messages);
  const [messageF, setMessageF] = useState(false);
  const { data: messageSubData } = useSubscription(MESSAGE_CREATED, {
    variables: { kladId },
  });
  const [getMessage, { refetch: refetchMessage }] = useLazyQuery(GET_MESSAGE);
  function scroll() {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }
  useEffect(() => {
    if (messageSubData?.messageCreated) {
      if (messageF) {
        refetchMessage({ messageId: messageSubData.messageCreated.id });
      } else
        getMessage({
          variables: { messageId: messageSubData.messageCreated.id },
          onCompleted(res) {
            setMessageF(true);
            setmessages((prevMessages) => [...prevMessages, res.message]);
          },
        });
    }
    scroll();
  }, [messageSubData, messagess]);
  return (
    <Box>
      <Toolbar />
      <Box mt={3}>
        <Stack px={2} my={2} spacing={2} minHeight="75vh">
          {messagess.map((message, index) =>
            message.user.id === user.id ? (
              <MessageRight key={message.id} message={message} />
            ) : index > 0 &&
              messagess[index].user.id === messagess[index - 1].user.id ? (
              <MessageLeft
                key={message.id}
                message={message}
                displayUser={false}
              />
            ) : (
              <MessageLeft key={message.id} message={message} displayUser />
            )
          )}
        </Stack>
      </Box>
    </Box>
  );
}
export default Messages;
