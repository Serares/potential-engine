import SignalRClient from './signalr';

// Main application entry point
document.addEventListener('DOMContentLoaded', async () => {
  console.log('TypeScript is working!');
  
  // Initialize SignalR client
  const signalRClient = new SignalRClient('User' + Math.random().toString(36).substr(2, 9));
  await signalRClient.start();

  // Example usage
  const messageInput = document.getElementById('messageInput') as HTMLInputElement;
  const sendButton = document.getElementById('sendButton') as HTMLButtonElement;
  const groupInput = document.getElementById('groupInput') as HTMLInputElement;
  const joinGroupButton = document.getElementById('joinGroupButton') as HTMLButtonElement;
  const leaveGroupButton = document.getElementById('leaveGroupButton') as HTMLButtonElement;

  if (sendButton && messageInput) {
    sendButton.addEventListener('click', async () => {
      const message = messageInput.value;
      if (message) {
        await signalRClient.sendMessage(message);
        messageInput.value = '';
      }
    });
  }

  if (joinGroupButton && groupInput) {
    joinGroupButton.addEventListener('click', async () => {
      const groupName = groupInput.value;
      if (groupName) {
        await signalRClient.joinGroup(groupName);
      }
    });
  }

  if (leaveGroupButton && groupInput) {
    leaveGroupButton.addEventListener('click', async () => {
      const groupName = groupInput.value;
      if (groupName) {
        await signalRClient.leaveGroup(groupName);
      }
    });
  }
}); 