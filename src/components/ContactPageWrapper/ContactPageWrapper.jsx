import React from 'react';
import { Title } from '@/Common';
import ContactList from './ContactList';

function ContactPageWrapper() {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="mx-8 my-4 mb-4 self-center lg:w-1/3">
        <Title text="I can be reached at..." />
      </div>
      <div className="flex h-full overflow-y-auto sm:mt-4 lg:mt-0 lg:w-2/3">
        <div className="w-full lg:my-auto">
          <ContactList />
        </div>
      </div>
    </div>
  );
}

export default ContactPageWrapper;
