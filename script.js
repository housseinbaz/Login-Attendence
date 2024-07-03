document.getElementById("createAccountForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Simulated backend (GitHub Pages)
    const databaseURL = "https://api.github.com/repos/housseinbaz/Login-Attendence/contents/accounts.json";
    
    // Prepare data to save
    const newData = {
        username: username,
        password: password
    };
    
    // Fetch API to save data
    fetch(databaseURL, {
        method: 'GET',
        headers: {
            'Authorization': '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',
        }
    })
    .then(response => response.json())
    .then(data => {
        // Append new data
        data.push(newData);
        
        // Update data on GitHub
        return fetch(databaseURL, {
            method: 'PUT',
            headers: {
                'Authorization': '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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Adding new account',
                content: btoa(JSON.stringify(data)), // encode data to base64
                sha: data.sha // if using GitHub API, get sha from previous response
            })
        });
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("message").textContent = "Account created successfully!";
        } else {
            document.getElementById("message").textContent = "Failed to create account.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("message").textContent = "Error creating account.";
    });
});
