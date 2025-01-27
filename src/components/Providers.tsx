'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#ff0000"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default Providers;
