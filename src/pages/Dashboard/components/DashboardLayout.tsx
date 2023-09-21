import React from 'react';
import styles from './../dashboard.module.scss';
import { Actions } from './Actions';
import { TopInfo } from './TopInfo';

export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='container py-4'>
        <TopInfo />
        <div className={styles.transactions}>{children}</div>
      </div>

  );
};
