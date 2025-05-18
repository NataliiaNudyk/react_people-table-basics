import React, { useContext, createContext } from 'react';
import { Person } from '../types';

type PeopleContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const defaultContext: PeopleContextType = {
  people: [],
  setPeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
};

export const PeopleContext = createContext<PeopleContextType>(defaultContext);

export const usePeople = () => {
  const context = useContext(PeopleContext);

  return context;
};
