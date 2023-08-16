import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counterSlice.ts'
import projectReducer from './modules/projectSlice.ts'
import dirArrayReducer from './modules/dirArraySlice.ts'
import watchDirReducer from './modules/watchDir.ts'
import watchStateFlagReducer from './modules/stateFlag.ts'
import createFileStateReducer from './modules/createFileState.ts'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    project: projectReducer,
    dirArray: dirArrayReducer,
    watchDir: watchDirReducer,
    stateFlag: watchStateFlagReducer,
    createFileState: createFileStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭序列化状态检测中间件
      serializableCheck: false,
    }),
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
