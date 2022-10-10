# LAB - Class 14

## Project: Terminal Chat Client

### Authors: Branden Ge and Daniel Frey

### Problem Domain

This lab demonstrates to use Socket.io to establish socket connections for an event-based, real-time chat application.

- [GitHub Client Repo](https://github.com/brandenge/terminal-chat-client)
- [GitHub Server Repo](https://github.com/DSFrey/terminal-chat-server/tree/main)
- [GitHub Server Deployed Site](https://terminal-chat-frey-ge.herokuapp.com/)

### Setup

#### Running the app

- `npm start` or `nodemon` (if you have nodemon) to start the application.
- You can start multiple chat clients by opening a new tab in the terminal and starting it again.

#### Features / Routes

Events:

1) JOIN - for joining the initial default lobby room
2) NEW_ROOM - for joining a new room
3) MESSAGE - for every message sent
4) RECEIVED - for every message received
5) GET_ALL - retrieves all messages queued in the lobby

#### UML Diagram

![UML Diagram](https://raw.githubusercontent.com/DSFrey/terminal-chat-client/main/uml14.png)

Diagram created with [Figma](https://www.figma.com/)

#### Credits: [Demo code from Ryan Gallaway at Code Fellows](https://github.com/codefellows/seattle-code-javascript-401d48/tree/main/class-13/inclass-demo)
