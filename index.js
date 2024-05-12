function auth(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    window.location.assign('page2.html');

  }
  function validateEmail() {
    
    var email = document.getElementById("email").value;

    if (email.trim() === '' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Cannot submit invalid email");
    }
    else {
    event.preventDefault();
    window.location.assign('page2.html');
    }
  }