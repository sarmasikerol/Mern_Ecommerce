import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  loading: false,
};

export const register = createAsyncThunk("register", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `http://localhost:4000/register`,
    requestOptions
  );

  return await response.json();
});

export const login = createAsyncThunk("login", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  };
  const response = await fetch(`http://localhost:4000/login`, requestOptions);

  let res = await response.json();
  if (res.token !== undefined) {
    localStorage.setItem("token", res?.token);
  }
  console.log(res);
  return res;
});

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(
      `http://localhost:4000/forgotPassword`,
      requestOptions
    );

    let res = await response.json();
    return res;
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (params) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: params.password }),
    };
    const response = await fetch(
      `http://localhost:4000/reset/${params.token}`,
      requestOptions
    );

    let res = await response.json();
    return res;
  }
);

export const profile = createAsyncThunk(
  "profile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // Eğer yanıt başarılı değilse (örneğin, 401, 404 gibi), hatayı yakalayın
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      return await response.json();
    } catch (error) {
      // Hataları yakalayıp `rejectWithValue` ile döndürebilirsiniz
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(profile.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });

    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(profile.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = {};
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
