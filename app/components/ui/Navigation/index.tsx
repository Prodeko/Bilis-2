'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

import styles from './Navigation.module.scss'

type NavProps = ComponentProps<'nav'>

interface LinkType {
  href: string
  linkName: string
}

interface Props extends NavProps {
  links: LinkType[]
}

export const Navigation = ({ links, ...props }: Props) => {
  const pathName = usePathname()
  return (
    <nav {...props} className={styles.navigation}>
      {links.map(link => (
        <Link
          className={pathName === link.href ? styles.link__active : styles.link}
          key={link.href}
          href={link.href}
        >
          {link.linkName}
        </Link>
      ))}
    </nav>
  )
}
