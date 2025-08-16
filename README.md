AI Voice Conversation Agent

This project is a backend service for a real-time, voice-based conversational AI. It is engineered to handle a complete voice interaction loop: receiving user audio, transcribing it to text, generating an intelligent response using a large language model, converting that response back into audio, and managing the conversation's state.

The architecture leverages WebSockets for low-latency, bi-directional communication, creating a seamless conversational experience akin to a phone call with an AI agent.

Core Features

🎙️ Speech-to-Text (STT): Utilizes an audio transcription service (inferred as OpenAI's Whisper from whisper.controller.js) to convert incoming user audio into text.

🧠 Intelligent Response Generation: Leverages a Large Language Model (inferred as OpenAI's GPT from gptController.controller.js) to understand context, maintain conversation history, and generate human-like responses.

🗣️ Text-to-Speech (TTS): Converts the generated text response back into audible speech using a TTS service (ttsController.controller.js).

💾 Conversation Memory: Stores and retrieves conversation history from a database (Conversation.models.js) to maintain context across multiple turns.

🚀 Real-time Communication: Implements WebSockets (websocket.js) for persistent, low-latency communication between the client and server.

📁 Audio File Handling: Uses multer middleware for efficient handling of audio file uploads.

🧱 Robust & Scalable Architecture: Built with a clear separation of concerns (controllers, routes, models, utils) for enhanced maintainability and scalability.

How It Works

The typical flow of an interaction is as follows:

Connection: A client establishes a WebSocket connection with the server.

User Speaks: The client captures audio from the user (e.g., in .wav format) and streams or sends it to the server.

Transcription: The whisper.controller.js processes the incoming audio, sending it to a transcription service (like the Whisper API) to be converted into text.

Processing & Response: The transcribed text is passed to the gptController.controller.js. This controller retrieves the conversation history from the database and sends the full context to a GPT model to generate a relevant response.

Save Context: The new user message and the AI's response are saved to the database via conversationController.controller.js to update the conversation history.

Synthesize Speech: The text response from the GPT model is sent to the ttsController.controller.js, which uses a Text-to-Speech API to convert it into an audio file (e.g., output.mp3).

Send Audio Back: The server sends the generated audio file back to the client over the WebSocket connection, which can then be played to the user.

Project Structure

.
├── .env.sample
├── .gitignore
├── package-lock.json
├── package.json
├── public
│   └── audio
│       ├── audio.wav
│       └── output.mp3
└── src
    ├── app.js
    ├── constant.js
    ├── controllers
    │   ├── conversationController.controller.js
    │   ├── gptController.controller.js
    │   ├── ttsController.controller.js
    │   └── whisper.controller.js
    ├── db
    │   └── Database.js
    ├── index.js
    ├── middlewares
    │   └── multer.middleware.js
    ├── models
    │   ├── CallData.models.js
    │   └── Conversation.models.js
    ├── routes
    │   ├── gptRoutes.routes.js
    │   └── whisper.routes.js
    ├── server.js
    ├── utils
    │   ├── ApiError.js
    │   ├── ApiResponse.js
    │   └── asyncHandeler.js
    └── websocket.js


Technology Stack

Backend: Node.js, Express.js

Real-time Communication: WebSockets (likely using a library like ws or socket.io)

AI Services (Assumed): OpenAI API

Whisper for Speech-to-Text

GPT-3.5/4 for Language Modeling

TTS-1 for Text-to-Speech

Database: MongoDB with Mongoose (inferred from .models.js naming convention and Database.js)

File Uploads: Multer

Setup and Installation

Follow these steps to get the project running locally.

1. Clone the repository

git clone <your-repository-url>
cd <repository-name>


2. Install dependencies

npm install


3. Set up Environment Variables

Create a .env file in the root of the project by copying the sample file.

cp .env.sample .env


Now, fill in the .env file with your credentials. It will likely require the following:

# Server Configuration
PORT=8000
CORS_ORIGIN=*

# Database Connection (e.g., MongoDB)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mydatabase

# OpenAI API Key
OPENAI_API_KEY=sk-...


4. Start the Server

You can run the server in development mode (which typically uses a tool like nodemon for auto-reloading) or production mode.

# To run in development mode (if configured in package.json)
npm run dev

# To start the production server
npm start


The server should now be running on the port specified in your .env file (e.g., http://localhost:8000).

API Endpoints

While the primary interaction is designed for WebSockets, the application also exposes RESTful API endpoints for specific, stateless tasks.

whisper.routes.js: Likely contains an endpoint like POST /api/v1/transcribe for uploading an audio file and receiving a transcription.

gptRoutes.routes.js: Might contain an endpoint like POST /api/v1/chat for a purely text-based interaction with the GPT model, useful for testing or non-real-time applications.

The main real-time conversation logic is handled by the WebSocket server defined in websocket.js.

Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

Fork the repository.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
