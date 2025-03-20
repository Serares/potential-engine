interface SignalRMessage {
    user: string;
    message: string;
}

declare global {
    interface Window {
        signalR: any;
    }
}

class SignalRClient {
    private connection: any;
    private currentUser: string;
    private messagesContainer: HTMLElement;

    constructor(user: string) {
        this.currentUser = user;
        this.messagesContainer = document.getElementById('messages') || document.createElement('div');
        this.connection = new window.signalR.HubConnectionBuilder()
            .withUrl("/pingpong")
            .withAutomaticReconnect()
            .build();

        this.setupEventHandlers();
    }

    private addMessage(message: string): void {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        this.messagesContainer.appendChild(messageElement);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    private setupEventHandlers(): void {
        // Handle connection events
        this.connection.on("UserConnected", (connectionId: string) => {
            this.addMessage(`User connected: ${connectionId}`);
        });

        this.connection.on("UserDisconnected", (connectionId: string) => {
            this.addMessage(`User disconnected: ${connectionId}`);
        });

        // Handle group events
        this.connection.on("GroupJoined", (connectionId: string, groupName: string) => {
            this.addMessage(`User ${connectionId} joined group: ${groupName}`);
        });

        this.connection.on("GroupLeft", (connectionId: string, groupName: string) => {
            this.addMessage(`User ${connectionId} left group: ${groupName}`);
        });

        // Handle messages
        this.connection.on("ReceiveMessage", (user: string, message: string) => {
            this.addMessage(`${user}: ${message}`);
        });

        this.connection.on("ReceiveGroupMessage", (user: string, message: string) => {
            this.addMessage(`[Group] ${user}: ${message}`);
        });
    }

    public async start(): Promise<void> {
        try {
            await this.connection.start();
            this.addMessage("SignalR Connected!");
        } catch (err) {
            console.error("SignalR Connection Error: ", err);
            this.addMessage("Connection Error!");
        }
    }

    public async sendMessage(message: string): Promise<void> {
        try {
            await this.connection.invoke("SendMessage", this.currentUser, message);
        } catch (err) {
            console.error("Error sending message: ", err);
            this.addMessage("Error sending message!");
        }
    }

    public async joinGroup(groupName: string): Promise<void> {
        try {
            await this.connection.invoke("JoinGroup", groupName);
        } catch (err) {
            console.error("Error joining group: ", err);
            this.addMessage("Error joining group!");
        }
    }

    public async leaveGroup(groupName: string): Promise<void> {
        try {
            await this.connection.invoke("LeaveGroup", groupName);
        } catch (err) {
            console.error("Error leaving group: ", err);
            this.addMessage("Error leaving group!");
        }
    }

    public async sendGroupMessage(groupName: string, message: string): Promise<void> {
        try {
            await this.connection.invoke("SendMessageToGroup", groupName, this.currentUser, message);
        } catch (err) {
            console.error("Error sending group message: ", err);
            this.addMessage("Error sending group message!");
        }
    }
}

// Export the SignalRClient class
export default SignalRClient; 