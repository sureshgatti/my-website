// email.js
(function() {
  // Initialize EmailJS with your Public Key
  emailjs.init("m-w9kPslaS7C8FtjI");

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status-message");

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        statusMessage.textContent = "Sending...";
        statusMessage.style.color = "blue";

        // Send mail to you using "from-customer" template
        emailjs.send("service_8p2wpis", "template_jb0woid", {
          to_name: "Suresh Gatti",
          from_name: name,
          from_email: email,
          original_message: message
        })
        .then(() => {
          // Send auto-reply to sender using "auto reply" template
          return emailjs.send("service_8p2wpis", "template_tebe7zi", {
            to_name: name,
            original_message: message
          });
        })
        .then(() => {
          statusMessage.textContent = "Message sent successfully!";
          statusMessage.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          statusMessage.textContent = "Failed to send message. Please try again.";
          statusMessage.style.color = "red";
          alert("❌ Failed to send your message. Please try again later.");
        });
      });
    }
  });
})();
