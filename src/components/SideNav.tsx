import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className='sticky top-0 px-2 py-4'>
      <ul className='flex flex-col items-start gap-2 whitespace-nowrap'>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user != null && (<li>
          <Link href={`/profiles/${user.id}`}>Profiles</Link>
        </li>)}
      </ul>
      {user == null 
        ? (<li className='list-none'><button onClick={() => void signIn()}>Login</button></li>) 
        : (<li className='list-none'><button onClick={() => void signOut()}>Logout</button></li>)
      }
    </nav>
  )
}

export default SideNav
