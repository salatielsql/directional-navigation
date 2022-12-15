import { ManagedDirectionalSection } from "./src/sections";

export {};

declare global {
  interface Window {
    __dn_sections__?: { [key: string]: ManagedDirectionalSection };
  }
}
