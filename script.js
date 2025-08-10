// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

toggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Smooth scroll for anchor links & close menu on click
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    navMenu.classList.remove('show');
  });
});

// EmailJS init with your public key
emailjs.init("m-w9kPslaS7C8FtjI");

// Contact form submit handler
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const statusMessage = document.getElementById("status-message");

    statusMessage.textContent = "Sending...";
    statusMessage.style.color = "blue";

    // Send to "from customer" template
    emailjs.send("service_8p2wpis", "template_jb0woid", {
        to_name: "Suresh Gatti",
        from_name: name,
        from_email: email,
        original_message: message
    })
    .then(() => {
        // Send auto-reply
        return emailjs.send("service_8p2wpis", "template_tebe7zi", {
            to_name: name,
            original_message: message
        });
    })
    .then(() => {
        statusMessage.textContent = "Message sent successfully!";
        statusMessage.style.color = "green";
        document.getElementById("contact-form").reset();
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        statusMessage.textContent = "Failed to send message. Please try again.";
        statusMessage.style.color = "red";
    });
});
