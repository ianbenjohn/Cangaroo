/* eslint-env jquery */

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post('/api/signup', {
      email,
      password,
    }).then(() => {
      window.location.replace('/members');
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    const emailInput = $('input#email-input');
    const passwordInput = $('input#password-input');

    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });
});