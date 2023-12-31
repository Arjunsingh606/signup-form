// userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

 interface UserForm {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}

interface UserState {
  data: UserForm[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}
interface LoginPayload {
  email?: string;
  password?: string;
}
interface User {
  email?: string;
  password?: string;
}

const initialState: UserState = {
  data: [] ,
  status: "idle",
  error: "",
};

// for login functionality
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }: LoginPayload) => {
    const response = await fetch('http://localhost:3001/users');
    const users: User[] = await response.json();
    return users;
});


// post user data at api
export const userPostData = createAsyncThunk("userdata", async (requestData: UserForm) => {
  try {
    const response = await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    return await response.json();
  } catch (error: any) {
    console.log(error.message, "data is not posted");
    throw error; // Re-throw the error to be caught in the rejected state
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userPostData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userPostData.fulfilled, (state, action: PayloadAction<UserForm[]>) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(userPostData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
      });
  
  },
});

// export const { setUser, login, forgetPassword } = userSlice.actions;
export default userSlice.reducer;
