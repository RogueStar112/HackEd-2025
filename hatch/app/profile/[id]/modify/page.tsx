"use client";

import { useState, useEffect } from "react";
import { addUser } from "../../../actions/addUser";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
);

interface FormData {
  id: string;
  username: string;
  name: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  interests: string[];
  skills: string[];
}

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    username: "",
    name: "",
    birth_year: new Date().getFullYear(),
    birth_month: 1,
    birth_day: 1,
    interests: [""],
    skills: [""],
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setFormData((prev) => ({ ...prev, id: user.id }));
        console.log(user.id);
      }
    };
    getUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
    fieldArray?: "interests" | "skills"
  ) => {
    const { name, value } = e.target;

    if (fieldArray && index !== undefined) {
      const updatedArray = [...formData[fieldArray]];
      updatedArray[index] = value;
      setFormData({ ...formData, [fieldArray]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (field: "interests" | "skills") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field: "interests" | "skills", index: number) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addUser(formData);
    console.log("Supabase result:", result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">User Form</h2>

      <div>
        <label className="block">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block">Year</label>
          <input
            type="number"
            name="birth_year"
            value={formData.birth_year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Month</label>
          <input
            type="number"
            name="birth_month"
            value={formData.birth_month}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Day</label>
          <input
            type="number"
            name="birth_day"
            value={formData.birth_day}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold">Interests</label>
        {formData.interests.map((interest, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={interest}
              onChange={(e) => handleChange(e, index, "interests")}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeField("interests", index)}
              className="px-2 bg-red-500 text-white rounded"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("interests")}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Interest
        </button>
      </div>

      <div>
        <label className="block font-semibold">Skills</label>
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleChange(e, index, "skills")}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeField("skills", index)}
              className="px-2 bg-red-500 text-white rounded"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("skills")}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Add Skill
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
