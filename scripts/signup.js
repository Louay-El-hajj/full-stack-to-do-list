document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(signupForm);

        fetch('http://localhost/fullstack%20to%20do%20list/todolistdb/signup.php', { /
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'user_created') {
                alert('Sign up successful. Please log in with your credentials.');
                window.location.href = 'index.html'; 
                alert('Sign up failed. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
