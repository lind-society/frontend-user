import { Session } from 'next-auth';
import React from 'react';

type TNavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: TNavbarProps) => {
  return <div>{session?.user?.email}</div>;
};

export default Navbar;
