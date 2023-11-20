'use client'

import { ButtonIcon } from 'app/components/ui/ButtonIcon'
import React, { useState } from 'react'
import { FiEdit2, FiX } from 'react-icons/fi'

import styles from './Season.module.scss'
import SeasonForm from './seasonForm'

type RenameSeasonProps = {
  id: number
}

const EditSeason: React.FC<RenameSeasonProps> = ({ id }) => {
  const [formOpen, setFormOpen] = useState(false)

  if (!formOpen)
    return <ButtonIcon Icon={FiEdit2} variation="destructive" onClick={() => setFormOpen(true)} />

  return (
    <div className={styles.editSeasonContainer}>
      <ButtonIcon
        Icon={formOpen ? FiX : FiEdit2}
        variation="destructive"
        onClick={() => setFormOpen(prev => !prev)}
      />
      {formOpen && <SeasonForm id={id} />}
    </div>
  )
}

export default EditSeason
