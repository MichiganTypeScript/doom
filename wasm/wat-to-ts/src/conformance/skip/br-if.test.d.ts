import { branch } from "./br-if.expected";

type tests = [
  // ^?
  branch<1>,
  branch<0>,
  branch<-2>,
]
