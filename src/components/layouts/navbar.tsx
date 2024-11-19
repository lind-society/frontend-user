import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import React from 'react';

type TNavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: TNavbarProps) => {
  const t = useTranslations('navbar');

  return (
    <div>
      {session?.user?.email}
      {t('')}
    </div>
  );
};

export default Navbar;
