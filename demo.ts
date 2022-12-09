import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";

import RemoteControlNavigation from "./src";

import "./styles.css";

window.addEventListener("DOMContentLoaded", RemoteControlNavigation.init);

window.destroy = RemoteControlNavigation.destroy;

window.addEventListener("navigation-did-focus", (e) => {
  smoothScrollIntoView(e.target, {
    scrollMode: "if-needed",
    block: "center",
    inline: "nearest",
  });
});
