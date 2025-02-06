import { createContext } from "react";

const UsernameContext = createContext('');
const StepFormContext = createContext(1);
const MainContext = createContext()

export {UsernameContext, StepFormContext, MainContext}