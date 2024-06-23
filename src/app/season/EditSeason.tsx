"use client";

import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";

import { IconButton } from "@ui/Buttons/IconButton";

import { CreateSeasonForm } from "@/app/season/CreateSeasonForm";

export const EditSeason = ({ id }: { id: number }) => {
  const [formOpen, setFormOpen] = useState(false);

  if (!formOpen)
    return (
      <IconButton
        Icon={FiEdit2}
        intent="destructive"
        onClick={() => setFormOpen(true)}
      />
    );

  return (
    <div className="flex items-center gap-2">
      <IconButton
        Icon={formOpen ? FiX : FiEdit2}
        intent="destructive"
        onClick={() => setFormOpen((prev) => !prev)}
      />
      {formOpen && <CreateSeasonForm id={id} />}
    </div>
  );
};
