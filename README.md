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
