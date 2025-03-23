import { createContext, useContext } from 'react';

const UserContext = createContext();

function useUser() {
   return useContext(UserContext);
}

export { UserContext, useUser };
