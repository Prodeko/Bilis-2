'use client'

import { ButtonIcon } from 'app/components/ui/ButtonIcon'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi'

type DeleteSeasonButtonProps = {
  id: number
}

const DeleteSeasonButton: React.FC<DeleteSeasonButtonProps> = ({ id }) => {
  const handleDelete = () => {
    fetch(`/api/season/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Handle successful deletion
          console.log('Season deleted successfully')
          window.location.reload()
        } else {
          // Handle deletion error
          console.error('Failed to delete season')
        }
      })
      .catch(error => {
        // Handle network error
        console.error('Network error:', error)
      })
  }

  return <ButtonIcon Icon={FiTrash2} variation="destructive" onClick={handleDelete} />
}

export default DeleteSeasonButton
