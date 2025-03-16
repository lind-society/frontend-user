import React, { FC, ReactElement } from 'react';
type TBaseContainer = {
  children: ReactElement;
};
const BaseContainer: FC<TBaseContainer> = ({ children }): ReactElement => {
  return (
    <div className='w-full mx-auto sm:max-w-[1440px]  px-5 sm:px-6 md:px-8 lg:px-16'>
      <>{children}</>
    </div>
  );
};

export const WideBaseContainer: FC<TBaseContainer> = ({
  children,
}): ReactElement => {
  return (
    <div className='w-full px-5 sm:px-6 md:px-8 lg:px-16'>
      <div className='max-w-[1920px] mx-auto'>
        <>{children}</>
      </div>
    </div>
  );
};

export default BaseContainer;
