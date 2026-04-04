# SpillR — Frontend

A real-time TV show social platform. Watch episodes together, post comments tied to specific moments, react with emojis, create polls, and see what your friends are watching — all in real time.

Built with React Native (Expo) and Socket.io.

---

## Tech Stack

- **React Native** + **Expo** (~54) — cross-platform mobile app
- **Expo Router** — file-based navigation (tabs + stacks)
- **Socket.io Client** — real-time comments, reactions, polls, and friend presence
- **Supabase** (`@supabase/supabase-js`) — direct database queries
- **Axios** — REST API calls to the backend
- **Lottie** — animations
- **Expo Linear Gradient** — image overlays

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
EXPO_PUBLIC_SUPABASE_URL=https://rhzhgfuzjusctjyfniwk.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=<your_supabase_anon_key>
```

> Variables must be prefixed with `EXPO_PUBLIC_` to be accessible in Expo.

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
│   └── supabaseClient.js        # Supabase client initialisation
├── utils/
│   ├── constants.js             # API base URL
│   ├── utilsFunctions.js        # Supabase queries
│   ├── utilsFunctionsByApi.js   # REST API calls (Axios)
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

1. Searches local Supabase database first
2. Falls back to external TVmaze API if no match
3. Saves new results to the local database

### API access

- **Supabase** (direct): shows, episodes, seasons, subscriptions, user/friend data
- **REST API** (Axios): comments, replies, notifications, trending shows

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
