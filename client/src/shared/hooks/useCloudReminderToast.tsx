import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';

const useCloudReminderToast = () => {
  const toast = useToast();
  useEffect(() => {
    toast({
      title: 'Quick Reminder',
      description: (
        <>
          <p>I'm using a trial cloud hosting tier, which puts my app's api to sleep after a period of inactivity.</p>
          <p>Because of that the initial request can take a while. but you won't see any further delays after it.</p>
        </>
      ),
      status: 'warning',
      duration: 10000,
      position: 'top-left',
      isClosable: true,
    });
  }, []);
};

export default useCloudReminderToast;
