document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = new FormData(this);

    // Create an XMLHttpRequest to send data to the backend
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "backend/register.php", true);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        const messageElement = document.getElementById("message");

        if (xhr.status === 200) {
            messageElement.style.color = "green";
            messageElement.textContent = response.message;
        } else {
            messageElement.style.color = "red";
            messageElement.textContent = "Registration failed: " + response.message;
        }
    };

    xhr.send(form);
});
