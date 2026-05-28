# Svitlopus

**Svitlopus** is a modern, self-hosted cloud storage platform that uses **Telegram** as its backend storage engine. By utilizing Telegram's bot infrastructure, it provides you with virtually unlimited, free storage for your files.

> [!IMPORTANT]
> **Self-Hosted & Single User**: Svitlopus is designed to be a **self-hosted** application, typically run and used by a **single user** to manage their private cloud storage.
>
> **Prerequisite**: To use Svitlopus, you **must have Docker installed** and running on your host machine.

The project is structured as:

- **Backend**: Go.
- **Frontend**: React+TypeScript.
- **Embedded Assets**: React SPA is fully embedded into the Go executable binary.

---

## 🛠 Requirements

To set up and run the platform, you will need:

1. **Docker**: Installed and running on the host machine.
2. **Telegram Bot Token**: Create a bot via [@BotFather](https://t.me/BotFather) and copy the token.
3. **Telegram Chats**: You need to create or have access to at least one Telegram group chat.
4. **Telegram API ID & API Hash**: Obtain them from [my.telegram.org](https://my.telegram.org/). These are required to spin up a local instance of the Telegram Bot API server, which bypasses the standard 50MB file limit (allowing files up to 2GB) and increases upload/download speed.

---

## 🚀 Deployment Methods

Choose one of the two supported methods to run Svitlopus:

### 1. Docker Compose

This is the most isolated, containerized, and straightforward way to run the application. The Svitlopus container automatically starts and manages the local `telegram-bot-api` helper container on your host system via the Docker socket.

**Step 1.** Copy the example configuration file and fill in your credentials (bot token, API ID, API Hash):

```bash
cp config.example.yaml config.yaml
```

**Step 2.** Build and start the services in the background:

```bash
docker-compose up -d --build
```

**Step 3.** Open your browser and navigate to:
[http://localhost:2600](http://localhost:2600)

---

### 2. Build and Run from Source (Development)

This method compiles the application from the repository.

**Requirements**: Go 1.26+, Node.js 20+, npm, and Docker (needed on the host because the Go backend will attempt to spawn the Telegram Bot API helper container).

**Step 1.** Clone the repository and initialize directories/files:

```bash
git clone https://github.com/dmi3midd/svitlopus.git
cd svitlopus
make setup
```

**Step 2.** Configure your tokens in the generated `config.yaml` file.

**Step 3.** Compile both the React frontend and Go backend:

```bash
make build
```

This builds the React SPA client under `web/` and compiles the Go backend into a single `main` binary with the frontend assets embedded.

**Step 4.** Run the compiled binary:

```bash
./main
```

The web interface will be accessible at `http://localhost:2600`.

#### Running in Development Mode

- Run the backend live-reload watcher (requires Go `air`):

  ```bash
  make watch
  ```

- Run the frontend development server in a separate terminal:

  ```bash
  cd web && npm run dev
  ```

### Will be improved in the future with more features...
