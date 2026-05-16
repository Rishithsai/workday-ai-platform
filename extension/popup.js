document
  .getElementById(
    "autofillBtn"
  )
  .addEventListener(
    "click",
    async () => {

      const tabs =
        await chrome.tabs.query({
          active: true,
          currentWindow: true
        });

      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "AUTOFILL"
        }
      );

      document.getElementById(
        "status"
      ).innerText =
        "Autofill Started";
    }
  );