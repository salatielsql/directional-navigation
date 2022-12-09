import { ManagedDirectionalSection } from "./src/sections";

export {};

declare global {
  interface Window {
    __sections__?: { [key: string]: ManagedDirectionalSection };
  }
}
