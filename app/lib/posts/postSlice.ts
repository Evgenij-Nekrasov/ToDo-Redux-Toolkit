import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostState } from "@/types/postType";

const initialState = [] as IPostState[];

export const postSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      addPost: {
         reducer: (state, action: PayloadAction<IPostState>) => {
            state.push(action.payload);
         },
         prepare: (title: string, body: string) => ({
            payload: {
               id: `${new Date()}`,
               title,
               body,
            } as IPostState,
         }),
      },
      deletePost: (state, action) => {
         const index = state.findIndex((todo) => todo.id === action.payload);
         if (index !== -1) {
            state.splice(index, 1);
         }
      },
   },
});

export const { addPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
