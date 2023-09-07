import { Message } from './Interfaces/Message.interface';

export default function createTxtFile(messages: Message[]) {
  let txtContent = '';

  messages.forEach((message) => {
    txtContent += `${message.createdAt} - ${message.user.firstname} ${message.user.lastname} - ${message.content}\n`;
  });

  const blob = new Blob([txtContent], { type: 'text/plain' });
  return blob;
}
