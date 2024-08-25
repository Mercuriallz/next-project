"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { authStore } from "@/store/authStore/auth.store";
import {
  LoginDataResponse,
  LoginFormData,
  ResponseLoginData,
  ResponseLoginSuccess,
  // ResponseLoginSuccess,
} from "@/store/authStore/type";
import { setItem } from "@/lib/localstorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const useAuth = authStore((state) => state);
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const payload = {
        username: data.username,
        password: data.password,
      };

      await useAuth.signIn(payload).then((res) => {
        if (res.status === 200) {
          const token = JSON.stringify(res.data?.token);
          const success = setItem("dashboard", token);
          if (success) {
            console.log("Token berhasil disimpan");
            toast.success(
              ({ closeToast }) => (
                <div>
                  <h4>Login Berhasil</h4>
                  <p>Selamat datang kembali!</p>
                </div>
              ),
              {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              },
            );
            router.push("/dashboard");
          } else {
            console.error("Gagal menyimpan token");
          }
        }
        // const loginData: LoginDataResponse = res.data;

        // if (!loginData.error) {
        //   // Enkripsi dan simpan seluruh data login
        //   const success = setItem("dashboard", JSON.stringify(loginData));
        //   if (success) {
        //     console.log("Login data berhasil disimpan");
        //     toast.success(
        //       ({ closeToast }) => (
        //         <div>
        //           <h4>Login Berhasil</h4>
        //           <p>Selamat datang kembali, {loginData.username}!</p>
        //         </div>
        //       ),
        //       {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //       },
        //     );
        //     router.push('/dashboard');
        //     // Tambahkan logika navigasi atau update state aplikasi di sini
        //   } else {
        //     console.error("Gagal menyimpan data login");
        //     toast.error("Gagal menyimpan data login");
        //   }
        // } else {
        //   // Jika ada error dalam respons
        //   toast.error(loginData.message);
        // }
      });
    } catch (err) {
      throw err;
      // Handle error
      // toast
      //   .error
      // ... (kode toast error yang sudah ada)
      // ()
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <ToastContainer />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must not exceed 20 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Username can only contain letters, numbers, and underscores",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{ mb: 2 }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
            // pattern: {
            //   value:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //   message:
            //     "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            // },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </Box>
    </>
  );
};
