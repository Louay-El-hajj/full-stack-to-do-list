document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(loginForm);

        fetch('http://localhost/fullstack%20to%20do%20list/todolistdb/login.php', { 
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'logged in') {
                alert('Login successful.');
                
                window.location.href = 'main.html'; 
            } else {
                alert('Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
