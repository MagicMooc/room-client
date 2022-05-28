import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqLogin } from "../../api/register";
import cookie from 'react-cookies'

let initialState = {
    username:'',
    password:'',
};
export const asyncLogin = createAsyncThunk("login",async (user) => {
    const {username,password} = user
    initialState = user
    console.log(username,password)
    const response = await reqLogin(user)
    return response.data
    
})

const LoginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        logOut(state, action) {
            return {redirectTo:''}
          },
    },
    extraReducers: {
        [asyncLogin.pending]: () => {
          console.log("Pending!");
        },
        [asyncLogin.fulfilled]: (state, { payload }) => {
          console.log("login Successfully!");
          console.log(payload)
          // 保存cookie
        // {path:'/'}意思是所有页面都能用这个cookie
          cookie.save('userData',initialState,{path:'/'})
          cookie.save('redirectTo','/',{path:'/'})
            console.log(cookie.load('userData'))

          return { ...state, redirectTo: '/' ,userData:initialState};
        },
        [asyncLogin.rejected]: () => {
          console.log("Rejected!");
          alert('用户名或密码错误！登录失败！')
        },
      },
});
export const { logOut } = LoginSlice.actions;
export default LoginSlice.reducer;