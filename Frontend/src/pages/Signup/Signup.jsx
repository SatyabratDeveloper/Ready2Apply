import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../../components";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (field) => (value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", form);
    // Handle Signup API
  };

  return (
    <div className="flex-grow flex items-center justify-center px-5 sm:px-10 text-gray-900">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-100">
        <h2 className="sm:text-3xl text-2xl font-bold text-center text-blue-600">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange("name")}
            required
          />

          <Input
            type="email"
            label="Email Address"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange("email")}
            required
          />

          <Input
            type="password"
            label="Password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange("password")}
            required
          />

          <Button label="Sign Up" type="primary" style="w-full py-3 text-lg" />
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
