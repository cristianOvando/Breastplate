// // TokenContext.jsx
// import { createContext } from "react";

// const TokenContext = createContext({
//   isToken: null,
//   username: null,
//   sex: null, 
//   setIsToken: () => {},
//   setUsername: () => {},
//   setSex: () => {}, 
// });

// export default TokenContext;

import { createContext } from "react";

const TokenContext = createContext();

export default TokenContext;