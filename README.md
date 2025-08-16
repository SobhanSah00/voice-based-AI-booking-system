├── .env.sample # Example environment variables
├── .gitignore
├── package.json
├── public/
│ └── audio/ # Sample audio files
│ ├── audio.wav
│ └── output.mp3
└── src/
├── app.js # Express app setup
├── constant.js # App-wide constants
├── controllers/ # Business logic
│ ├── conversationController.controller.js
│ ├── gptController.controller.js
│ ├── ttsController.controller.js
│ └── whisper.controller.js
├── db/
│ └── Database.js # Database connection
├── index.js # Entry point
├── middlewares/
│ └── multer.middleware.js # File upload handling
├── models/
│ ├── CallData.models.js
│ └── Conversation.models.js
├── routes/ # API Routes
│ ├── gptRoutes.routes.js
│ └── whisper.routes.js
├── server.js # Server startup
├── utils/ # Helpers
│ ├── ApiError.js
│ ├── ApiResponse.js
│ └── asyncHandeler.js
└── websocket.js # WebSocket setup
