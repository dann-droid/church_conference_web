document.getElementById("registrationForm").addEventListener("submit", async (event) => 
    {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            alert(`Registration successful! Your ticket is at: ${result.ticketPath}`);
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred during registration.");
    }
   }
);
