      const socket = io();
      const supplyPrompts = [
        "Zombie in a Walmart bag",
        "A dinosaur conductor",
        "A lego unicorn",
      ];
      document.addEventListener("DOMContentLoaded", () => {
        r = Math.floor(Math.random() * supplyPrompts.length);
        document.getElementById("prompt-box").placeholder = supplyPrompts[r];
      });

      window.onload = function () {
        document
        .getElementById("prompt")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          const formData = new FormData(event.target);
          const prompt = formData.get("prompt-box");
          console.log(prompt);
          socket.emit("prompt", { prompt });
        });
      }