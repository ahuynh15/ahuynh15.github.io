import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';

const Container = ({ flat = false, className, children, ...props }) => {
  return (
    <div
      className={classNames(
        'box-border rounded-2xl border-zinc-900 bg-zinc-50 transition duration-500 dark:border-zinc-50 dark:bg-zinc-900',
        flat
          ? 'ml-[3px] mt-[3px] border-2 pt-[6px] pl-[14px] pb-[7px] pr-[15px]'
          : 'border-b-5 border-r-5 border-t-2 border-l-2 pt-[5px] pl-[13px] pb-2 pr-4 shadow-solid-md shadow-zinc-300 dark:shadow-zinc-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  flat: PropTypes.bool,
  children: PropTypes.element,
};

export default Container;
