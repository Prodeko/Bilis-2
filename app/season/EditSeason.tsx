"use client";

import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";

import { IconButton } from "@ui/Buttons/IconButton";

import { CreateSeasonForm } from "./CreateSeasonForm";

type RenameSeasonProps = {
  id: number;
};

const EditSeason: React.FC<RenameSeasonProps> = ({ id }) => {
  const [formOpen, setFormOpen] = useState(false);

  if (!formOpen)
    return (
      <IconButton
        Icon={FiEdit2}
        variation="destructive"
        onClick={() => setFormOpen(true)}
      />
    );

  return (
    <div className="flex items-center gap-2">
      <IconButton
        Icon={formOpen ? FiX : FiEdit2}
        variation="destructive"
        onClick={() => setFormOpen((prev) => !prev)}
      />
      {formOpen && <CreateSeasonForm id={id} />}
    </div>
  );
};

export default EditSeason;
