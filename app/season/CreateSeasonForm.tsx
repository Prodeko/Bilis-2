"use client";

import { useState } from "react";

interface Props {
  id?: number;
}

export const CreateSeasonForm = ({ id }: Props) => {
  const [message, setMessage] = useState("");
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const seasonData = {
      name: formData.get("name"),
      start: formData.get("start"),
      end: formData.get("end"),
    };
    fetch(`/api/season/${id}`, {
      method: "PUT",
      body: JSON.stringify(seasonData),
    }).then(async (res) => {
      if (res.ok) {
        setMessage("Season updated successfully");
        window.location.reload();
        return res.json();
      }
      setMessage("Error updating season");
    });
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const seasonData = {
      name: formData.get("name"),
      start: formData.get("start"),
      end: formData.get("end"),
    };
    fetch("/api/season", {
      method: "POST",
      body: JSON.stringify(seasonData),
    }).then(async (res) => {
      if (res.ok) {
        setMessage("Season added successfully");
        return res.json();
      }
      const error = (await res.json()) as { message: string };
      setMessage(`Error adding season: ${error.message}`);
    });
  };

  return (
    <form
      onSubmit={id ? handleUpdate : handleCreate}
      className="flex items-center gap-8"
    >
      <div className="flex gap-4">
        <input
          type="text"
          name="name"
          placeholder="Season Name (optional)"
          className="rounded-sm border border-neutral-200 p-3 text-neutral-800 placeholder:text-neutral-400"
        />
        <input
          type="date"
          name="start"
          className="rounded-sm border border-neutral-200 p-3 text-neutral-800 placeholder:text-neutral-400"
        />
        <input
          type="date"
          name="end"
          className="rounded-sm border border-neutral-200 p-3 text-neutral-800 placeholder:text-neutral-400"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-md border-none bg-success-600 px-7 py-4 text-neutral-50 hover:bg-success-700 active:bg-success-800"
        >
          Add Season
        </button>
      </div>
      {message && (
        <p className="rounded-md border-[3px] border-danger-600 bg-neutral-200 p-6 text-3xl font-medium text-danger-600">
          {message}
        </p>
      )}
    </form>
  );
};
