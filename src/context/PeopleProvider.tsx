import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleContext } from './PeopleContext';

type PeopleProviderProps = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setPeople([]);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        errorMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
