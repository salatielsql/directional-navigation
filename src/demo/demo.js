import DirectionalNavigation from "../lib";

window.addEventListener("DOMContentLoaded", DirectionalNavigation.init);

window.addEventListener("dn:did-focus", (e) => {
  console.log("[directional-navigation]: did focus:", e.target);

  e.target.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
});
