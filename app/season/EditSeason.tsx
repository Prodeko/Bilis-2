"use client";

import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";

import { ButtonIcon } from "@ui/ButtonIcon";

import { CreateSeasonForm } from "./CreateSeasonForm";

type RenameSeasonProps = {
  id: number;
};

const EditSeason: React.FC<RenameSeasonProps> = ({ id }) => {
  const [formOpen, setFormOpen] = useState(false);

  if (!formOpen)
    return (
      <ButtonIcon
        Icon={FiEdit2}
        variation="destructive"
        onClick={() => setFormOpen(true)}
      />
    );

  return (
    <div className="flex items-center gap-2">
      <ButtonIcon
        Icon={formOpen ? FiX : FiEdit2}
        variation="destructive"
        onClick={() => setFormOpen((prev) => !prev)}
      />
      {formOpen && <CreateSeasonForm id={id} />}
    </div>
  );
};

export default EditSeason;
