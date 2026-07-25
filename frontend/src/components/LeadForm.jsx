import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, budget, message } = formData;

    // Validation
    if (!name || !email || !budget || !message) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/leads", formData);

      toast.success(data.message);

      // Reset Form
      setFormData({
        name: "",
        email: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="lead-form"
      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Submit Your Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Select Budget</option>
          <option value="Under ₹10k">Under ₹10k</option>
          <option value="₹10k - ₹50k">₹10k - ₹50k</option>
          <option value="₹50k - ₹1L">₹50k - ₹1L</option>
          <option value="Above ₹1L">Above ₹1L</option>
        </select>

        <textarea
          rows="5"
          name="message"
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Lead"}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;