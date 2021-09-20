import React from 'react'

export const defFunctionCtx = {
  f: (x : number) => x ** 3 + x * Math.sin(x),
  der1F: (x : number) => 3 * x ** 2 + x * Math.cos(x) + Math.sin(x),
}

export const FunctContext = React.createContext(defFunctionCtx);
const FunctProvider = FunctContext.Provider;
export default FunctProvider;