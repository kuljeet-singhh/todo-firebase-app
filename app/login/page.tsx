"use client";

import Input from "@/components/Input";
import { loginUser } from "@/server/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      // loginUser(values.email, values.password);
    
      // console.log(values);
      // formik.resetForm();
      handleLogin(values);
    },
  });

  const handleLogin = async (values) => {

  try {

    const res = await loginUser(
      values.email,
      values.password
    );

    console.log(res, "login user");

    toast.success("Login successful");
console.log("display name from login",res.displayName);
    router.push("/");

  } catch (error) {

    const errorCode = error.code;

    if (errorCode === "auth/invalid-credential") {
      toast.error("Invalid email or password");
    }
    else if (errorCode === "auth/user-not-found") {
      toast.error("User not found");
    }
    else if (errorCode === "auth/wrong-password") {
      toast.error("Wrong password");
    }
    else {
      toast.error("Login failed");
    }

  }

};

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
        Login
        </h1>

        <form onSubmit={formik.handleSubmit}>

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            touched={formik.touched.email}
            
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            Sign Up
          </button>

        </form>

      </div>

    </div>

  );
}