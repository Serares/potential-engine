class SignalRClient {
    connection;
    currentUser;
    messagesContainer;
    constructor(user) {
        this.currentUser = user;
        this.messagesContainer = document.getElementById('messages') || document.createElement('div');
        this.connection = new window.signalR.HubConnectionBuilder()
            .withUrl("/pingPongHub")
            .withAutomaticReconnect()
            .build();
        this.setupEventHandlers();
    }
    addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        this.messagesContainer.appendChild(messageElement);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    setupEventHandlers() {
        // Handle connection events
        this.connection.on("UserConnected", (connectionId) => {
            this.addMessage(`User connected: ${connectionId}`);
        });
        this.connection.on("UserDisconnected", (connectionId) => {
            this.addMessage(`User disconnected: ${connectionId}`);
        });
        // Handle group events
        this.connection.on("GroupJoined", (connectionId, groupName) => {
            this.addMessage(`User ${connectionId} joined group: ${groupName}`);
        });
        this.connection.on("GroupLeft", (connectionId, groupName) => {
            this.addMessage(`User ${connectionId} left group: ${groupName}`);
        });
        // Handle messages
        this.connection.on("ReceiveMessage", (user, message) => {
            this.addMessage(`${user}: ${message}`);
        });
        this.connection.on("ReceiveGroupMessage", (user, message) => {
            this.addMessage(`[Group] ${user}: ${message}`);
        });
    }
    async start() {
        try {
            await this.connection.start();
            this.addMessage("SignalR Connected!");
        }
        catch (err) {
            console.error("SignalR Connection Error: ", err);
            this.addMessage("Connection Error!");
        }
    }
    async sendMessage(message) {
        try {
            await this.connection.invoke("SendMessage", this.currentUser, message);
        }
        catch (err) {
            console.error("Error sending message: ", err);
            this.addMessage("Error sending message!");
        }
    }
    async joinGroup(groupName) {
        try {
            await this.connection.invoke("JoinGroup", groupName);
        }
        catch (err) {
            console.error("Error joining group: ", err);
            this.addMessage("Error joining group!");
        }
    }
    async leaveGroup(groupName) {
        try {
            await this.connection.invoke("LeaveGroup", groupName);
        }
        catch (err) {
            console.error("Error leaving group: ", err);
            this.addMessage("Error leaving group!");
        }
    }
    async sendGroupMessage(groupName, message) {
        try {
            await this.connection.invoke("SendMessageToGroup", groupName, this.currentUser, message);
        }
        catch (err) {
            console.error("Error sending group message: ", err);
            this.addMessage("Error sending group message!");
        }
    }
}
// Export the SignalRClient class
export default SignalRClient;
//# sourceMappingURL=signalr.js.map