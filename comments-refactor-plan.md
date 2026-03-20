# Comments Refactor Plan

## Completed

### Phase 1: Custom Hook
- Created `hooks/useSocketComments.js` — owns all socket listeners, buffer, drip-feed, polling, optimistic updates
- Hook returns `{ comments, setComments }`
- All socket data logic moved out of components

### Phase 2: Unified CommentList
- `CommentList.jsx` is now stateless — receives `comments` as a prop, renders `CommentCard`
- Used by all pages: live chat (from hook), home (from REST), profile/user (from REST)
- Deleted `CommentsSocket.jsx`

### Phase 3: Unified CommentCard
- `CommentCard.jsx` handles both chat and non-chat modes via `isChat` conditionals
- Time: `isChat` shows `formatRuntime`, otherwise `timeAgo`
- Navigation: `!isChat` wraps body in `Pressable` to navigate to TV show
- Spoiler: reveal UI, flag button with `onPress` + red stroke, `handlePressedSpoiler`
- Avatar/username: uses props when available, falls back to `getUserById` fetch
- Receives whole `comment` object as a single prop (not 20+ individual props)
- Deleted `CommentCardSocket.jsx`, `CommentCard-backup.jsx`, `CommentList-backup.jsx`

## Next Steps

### Phase 4: Move emit logic into the hook
Move socket emits out of components so no component imports socket directly.

1. **`deleteComment`** — move `socket.emit("comment:delete")` from `CommentCard` into the hook. Return `deleteComment(comment_id)` from the hook. Pass it down through `CommentList` as a callback prop.

2. **`postComment`** — move `socket.emit("comment:post")` from `PostComment.jsx` into the hook. Return `postComment(commentData)` from the hook.

3. **`postReply`** — move `socket.emit("reply:post")` from `Post.jsx` into the hook. Return `postReply(replyData)` from the hook.

4. **`flagComment`** — move `socket.emit("spoiler:mark")` from `CommentCard` into the hook. Return `flagComment(comment_id)` from the hook.

### Phase 5: Unify PostInput
- Replace `PostComment.jsx` and `Post.jsx` with one `PostInput.jsx`
- Takes `onSubmit` callback prop — caller decides if it posts a comment or reply
- No socket import needed in the component

### Phase 6: Move reply socket logic into the hook
- `RepliesList.jsx` independently listens to `socket.on("reply:new")` — has a bug where it doesn't filter by `comment_id` (all expanded threads receive all replies)
- Move reply listener into the hook, manage `repliesByComment` state there
- `RepliesList` becomes stateless, receives replies as props
- Fix the `comment_id` filter bug

### Phase 7: Cleanup
- Verify no component imports socket directly — only the hook should
- Delete `Comments.jsx` from main (still exists there from before rename)
- Remove `socket.on("comment:remove")` listener leak in `CommentCard.handlePressDelete` (socket.on inside click handler, never cleaned up)
- Clean up unused styles in `CommentCard` and `CommentList`

## Architecture After Refactor

```
hooks/useSocketComments.js    <-- one hook, one socket, all events
app/components/CommentList.jsx    <-- one list, renders comments from props
app/components/CommentCard.jsx    <-- one card, isChat controls conditionals
app/components/PostInput.jsx      <-- one post input, onSubmit callback prop
```

## Key Rules
- All socket handlers defined INSIDE the hook body (not module scope)
- `useRef` needs a syncing effect to stay current with props
- `socket.off("event", fn)` must receive the exact same function reference
- Name all handlers as variables (no inline arrows in socket.on)
- No component should import socket directly — only the hook
