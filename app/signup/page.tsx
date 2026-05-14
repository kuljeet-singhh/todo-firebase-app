"use client";

import Input from "@/components/Input";
import { signupUser } from "@/server/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function Signup() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      handleSignup(values);
    },
  });

const handleSignup = async (values) => {

  try {

    const res = await signupUser(
      values.email,
      values.password,
      values.username
    );

    console.log(res, "reeess");

    toast.success("Signup successful");
  formik.resetForm()
    router.push("/");

  } catch (error) {

    const errorCode = error.code;

    if (errorCode === "auth/email-already-in-use") {
      toast.error("Email already exists");
    }
    else if (errorCode === "auth/invalid-email") {
      toast.error("Invalid email");
    }
    else if (errorCode === "auth/weak-password") {
      toast.error("Password should be at least 6 characters");
    }
    else {
      toast.error("Something went wrong");
    }

  }

};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.errors.username}
            touched={formik.touched.username}
          />

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
