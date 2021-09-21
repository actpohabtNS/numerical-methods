import React from 'react'
import { functs } from './functs';

export const FunctContext = React.createContext(functs);
const FunctProvider = FunctContext.Provider;
export default FunctProvider;