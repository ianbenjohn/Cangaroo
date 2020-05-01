/* eslint-env jquery */

$(document).ready(() => {
  // Getting references to our form and input
  const assistForm = $('form#basket-form');
  const sizeInput = $('input#size-input');
  const emailInput = $('input#UserEmail');

  function handleAssistErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does a post to the 'create assist' route. If successful, the page is reloaded
  // Otherwise we log any errors
  function newAssist(UserEmail, size) {
    $.post('/api/assistance', {
      UserEmail,
      size,
    }).then(() => {
      window.location.reload();
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleAssistErr);
  }

  // When the submit button is clicked, we validate the size is not blank
  assistForm.on('submit', (event) => {
    console.log('submitting assist form');
    event.preventDefault();

    // function getLastSunday(d) {
    //   var t = new Date(d);
    //   t.setDate(t.getDate() - t.getDay());
    //   return t;
    // }

    const assistData = {
      size: sizeInput.val().trim(),
      UserEmail: emailInput.val(),
    };

    /* Donations can't be negative quantity */
    if (Math.sign(assistData.size) === -1) {
      console.log('negative quantity donation, return');
      return;
    }
    if (!assistData.size || !assistData.UserEmail) {
      console.log('no size or UserEmail data, return');
      return;
    }
    // If we have a product and quantity, run the newDonation function
    newAssist(assistData.UserEmail, assistData.size);
    console.log(assistData);
    sizeInput.val('');
  });
});
