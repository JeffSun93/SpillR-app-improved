# SpillR — Frontend

<video src="https://github.com/user-attachments/assets/54c711aa-d961-448b-a67c-9b01bd51015c" controls width="100%"></video>

> **Group project — 6 members** | React Native · Expo · Socket.io · REST API

**[Try live demo](https://spiller.netlify.app)**
**[Try mobile demo](https://appetize.io/app/b_gs6xaa4ybdkivvnihe3aijkwhi)**

A real-time TV show social platform. Watch episodes together, post comments tied to specific moments, react with emojis, create polls, and see what your friends are watching — all in real time.

> This frontend is designed to be used alongside the [Spillr backend](https://github.com/JeffSun93/spillr-BE-improved). API documentation is available at [spillr-be-improved.onrender.com](https://spillr-be-improved.onrender.com).

---

## Tech Stack

| Layer        | Technology                                       |
| ------------ | ------------------------------------------------ |
| Mobile / Web | React Native + Expo (~54), Expo Router           |
| Real-time    | Socket.io Client (WebSocket)                     |
| HTTP         | Axios                                            |
| Animations   | Lottie React Native                              |
| Backend API  | Node.js + Express + PostgreSQL + Socket.io       |

---

## My Contributions

### 1. Friends Are Watching — Live Presence (full-stack)

Designed and implemented the real-time "who's watching" feature — the most technically complex part of the project due to its layered Socket.io architecture.

**Backend design:**

- Two in-memory Maps: `userEpisodeMap` (`userId → episodeId`) and `episodeUserMap` (`episodeId → Set<userId>`) track all active viewers in real time
- On `room:join`: user is added to both maps; `friend:join` is emitted to sockets in the `watch:<userId>` room; `room:userIn` is broadcast globally
- On `room:leave` / socket `disconnect`: maps are cleaned up atomically; `friend:leave` and `room:userOut` are emitted to trigger UI updates on all clients
- `room:load` event: client sends their friend list on mount; server returns friend statuses (`friendsList:status`) and per-episode viewer counts (`roomList:status`) in one round-trip

**Frontend design:**

- `FriendsAreWatching` component fetches the logged-in user's friend list, emits `room:load`, and maintains local `roomStatus` state
- Listens to 5 socket events (`roomList:status`, `room:userIn`, `room:userOut`, `friend:join`, `friend:leave`) to keep counts in sync without polling
- Renders a horizontally scrollable list of `FriendsAreWatchingCard` — each card shows the episode, friend count, and total viewer count, linking to the live chat

### 2. TV Show Data Sync Script (backend)

Built the `syncShowData` script that populates the database with real TV show data from two external APIs.

**The pipeline:**

1. **TVmaze (primary source)** — fetches show metadata, season list, and all episodes per season with rate-limiting (`sleep(50ms)` between requests to avoid hitting API limits)
2. **TVDB (enrichment layer)** — independently looks up the same show on TVDB v4, fetches season images and episode details; TVDB failures are non-fatal and the script continues with TVmaze data only
3. **Merge logic** — season images fall back in priority order: TVmaze → TVDB → show poster; episode synopses and images are merged similarly, with TVDB filling gaps; non-ASCII whitespace in TVDB text is normalised
4. **Output** — cleaned data is serialised as JS module files (`tv-shows.js`, `seasons.js`, `episodes.js`) ready for seeding; a timestamped log records which shows succeeded or failed

The key challenge was handling two APIs with different schemas, partial data, independent failure modes, and rate limits — while ensuring the output is always consistent and seedable.

### 3. Backend MVC Structure & Routes

Set up the initial MVC file structure for the backend (routes / controllers / services / models) and wrote a portion of the Express route handlers, establishing the pattern used across the project.

### 4. Trending TV Shows (full-stack)

Built the trending shows feature end-to-end. Backend: `GET /api/tv-shows?sort_by=comments&order=desc` endpoint sorted by comment activity. Frontend: `Trending` component and `TrendingCard` — a horizontally scrollable carousel that fetches and displays the most-discussed shows.

### 5. Comments System (frontend, partial)

Contributed to parts of the frontend comment system, including some of the `CommentCard` UI work.

---

## My Improvements (post-fork)

After forking the original project, the following improvements were made across both the frontend and backend:

### Single Session Locking

Implemented a socket-based single session system to prevent the same account from being used in multiple browser tabs simultaneously. When a user selects an account, a `user:login` event is emitted; the server checks an in-memory `activeUserSocketMap` and either grants the session (`login:success`) or rejects it (`login:rejected`). The lock is automatically released on socket disconnect. On the frontend, rejected accounts show an inline "in use" indicator alongside a native alert.

### Auth Guard & Login-first Flow

Changed the app's entry flow so that account selection is always required on launch — no default user is pre-loaded. An `AuthGuard` component redirects to `/login` whenever `loggedInUser` is null, and the tab layout uses Expo Router's `<Redirect>` to prevent any screen from rendering before a user is selected, eliminating null-user crashes.

### Remove Supabase — Migrate All Data Fetching to REST API

Removed all direct Supabase client calls from `utilsFunctions.js` and replaced them with REST API calls via Axios. Added 11 new backend endpoints to support the migration:

- `GET /api/tv-shows/search`, `/api/tv-shows/name/:name`, `/api/tv-shows/:id`, `/api/tv-shows/:id/seasons`
- `GET /api/seasons/:id`
- `DELETE /api/comments/:id`, `DELETE /api/comments/replies/:id`
- `GET /api/profiles/search`
- `POST /api/profiles/friends`, `PATCH /api/profiles/friends`, `DELETE /api/profiles/friends`

The frontend no longer has any direct database dependency — all data flows through the backend REST API. The Supabase client (`lib/supabaseClient.js`) is now unused.

### Backend Deployment (Docker + Render)

Independently set up and deployed the backend to Render using Docker. Wrote the `Dockerfile` (Node 22 Alpine, production-only dependencies via `npm ci --omit=dev`) and `.dockerignore`, and configured the Render service to build and deploy from the Docker image automatically on every push to `main`.

### API Documentation Page

Built a comprehensive dark-themed static HTML API documentation page (`/public/docs.html`) covering all REST endpoints, Socket.io events, and database schema. Configured Express to serve it as the default route (`/`) instead of the Socket.io test page.

---

## Getting Started

### Requirements

- Node.js v18+
- [Expo Go](https://expo.dev/go) app on your phone (for physical device testing)
- Or an Android/iOS emulator

### 1. Clone the repo

```bash
git clone https://github.com/JeffSun93/SpillR-app-improved
cd SpillR-app-improved
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_API_URL=https://spillr-be-improved.onrender.com
```

If you are running the backend locally, point it to your local server instead:

```env
EXPO_PUBLIC_API_URL=http://localhost:9090
```

> Variables must be prefixed with `EXPO_PUBLIC_` to be accessible in Expo. If `EXPO_PUBLIC_API_URL` is not set, the app falls back to the production URL.

### 4. Start the development server

```bash
npm start
```

Scan the QR code in the terminal with the Expo Go app, or press `a` (Android), `i` (iOS), or `w` (web).

---

## Scripts

| Script            | Description               |
| ----------------- | ------------------------- |
| `npm start`       | Start Expo dev server     |
| `npm run android` | Start on Android emulator |
| `npm run ios`     | Start on iOS simulator    |
| `npm run web`     | Start in browser          |

---

## Project Structure

```text
├── app/                          # Expo Router routes
│   ├── _layout.jsx              # Root layout — providers, socket init, fonts
│   ├── (tabs)/                  # Bottom tab navigation
│   │   ├── index.jsx            # Home — friends' comment feed
│   │   ├── searchpage.jsx       # Search shows and users
│   │   ├── notifications.jsx    # Notifications
│   │   └── user.jsx             # Current user profile
│   ├── tv-show/[id].jsx         # TV show details and episodes
│   ├── episode-live-chat/[id].jsx # Live episode chat
│   ├── profile-page/[id].jsx    # Other user's profile
│   ├── friend-list/[id].jsx     # Friends watching an episode
│   ├── login/[id].jsx           # Account switcher
│   └── components/              # Reusable components
│       ├── pages/               # Page-level components
│       └── ui/                  # UI primitives (text, buttons)
├── context/
│   ├── User.jsx                 # Logged-in user state
│   ├── Episode.jsx              # Current episode metadata
│   └── FloatingParticle.jsx     # Emoji particle animation state
├── hooks/
│   ├── useSocketComments.js     # Real-time comment socket handling
│   └── useCommentsPlayback.js   # Playback-aware comment buffering
├── socket/
│   └── connection.js            # Socket.io client instance
├── lib/
│   └── supabaseClient.js        # Supabase client (unused — kept for reference)
├── utils/
│   ├── constants.js             # API base URL
│   ├── utilsFunctions.js        # Data-fetching helpers (REST API via Axios)
│   ├── utilsFunctionsByApi.js   # Additional REST API calls (Axios)
│   ├── CleanTime.js             # Relative time formatting
│   ├── cleanText.js             # HTML tag stripper
│   └── emojiLookupObject.js     # Emoji reaction map
├── theme/                       # Design tokens (colors, spacing, typography)
├── styles/                      # Global and component StyleSheets
├── assets/                      # Images, icons, fonts, Lottie JSON
└── app.json                     # Expo configuration
```

---

## Screens

| Screen        | Route                     | Description                                              |
| ------------- | ------------------------- | -------------------------------------------------------- |
| Home          | `/`                       | Paginated feed of comments from friends' shows           |
| Search        | `/searchpage`             | Search shows (local DB + external API) and users         |
| Notifications | `/notifications`          | User notifications                                       |
| Profile       | `/user`                   | Current user's stats, subscriptions, and comment history |
| TV Show       | `/tv-show/[id]`           | Show details, seasons, episodes, subscribe toggle        |
| Live Chat     | `/episode-live-chat/[id]` | Real-time comments, reactions, polls, timeline scrubber  |
| Other Profile | `/profile-page/[id]`      | Another user's public profile                            |
| Friends List  | `/friend-list/[id]`       | Friends currently watching an episode                    |
| Login         | `/login`                  | Switch between user accounts                             |

---

## Real-Time Features (Socket.io)

The app connects to `https://spillr-be-improved.onrender.com` via WebSocket. All live features run through Socket.io.

### Events emitted (Client → Server)

| Event            | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| `user:login`     | Claim a user session (single session per account) |
| `room:join`      | Enter an episode's live room                      |
| `room:leave`     | Leave the episode room                            |
| `comment:post`   | Post a new comment                                |
| `comment:delete` | Delete a comment                                  |
| `reaction:add`   | Add an emoji reaction                             |
| `reply:post`     | Post a reply                                      |
| `poll:create`    | Create a poll                                     |
| `poll:vote`      | Vote on a poll option                             |

### Events received (Server → Client)

| Event                          | Purpose                            |
| ------------------------------ | ---------------------------------- |
| `comment:new`                  | New comment from another user      |
| `comment:remove`               | A comment was deleted              |
| `comment:flagged`              | A comment was marked as spoiler    |
| `reply:new`                    | New reply to a comment             |
| `poll:update`                  | Poll results updated               |
| `roomList:status`              | Friends' current room statuses     |
| `room:userIn` / `room:userOut` | Friend joined or left the room     |
| `friend:join` / `friend:leave` | Friend came online or went offline |

---

## Architecture Notes

### Playback-aware comment buffering

Comments in the live chat are tied to `runtime_seconds` — the point in the episode when they were posted. The `useCommentsPlayback` hook:

- Fetches all comments when the episode starts
- Pre-fetches 3 minutes ahead every 30 seconds
- Buffers comments and reveals them as the playback position reaches their timestamp
- Re-syncs when the user scrubs to a different position

### Search strategy

1. Searches local database via `GET /api/tv-shows/search`
2. Falls back to external TVmaze API via `POST /api/tv-shows` if no match
3. New results are saved to the database by the backend

### API access

All data fetching goes through the backend REST API via Axios — there is no longer any direct database dependency in the frontend.

---

## Design

- Dark theme — black background (`#101010`), white text
- Accent colour — magenta (`#E500FF`)
- Custom fonts — Inter (Google), Agenda (local)
- Styling via React Native `StyleSheet` with a shared theme object

---

## Backend

The backend repository and API documentation are at:
[https://spillr-be-improved.onrender.com](https://spillr-be-improved.onrender.com)
