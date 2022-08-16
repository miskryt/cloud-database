$('#signin_form').validate({
  rules: {
    email: {
      required: true,
    },
    password: {
      required: true,
    },
  },
  messages: {
    email: 'Email is required!',
    password: 'Password is required!',
  },
  success: function (label) {
    label.addClass('valid').text('Looks good');
  },
  onkeyup: false,
  submitHandler: function (form) {
    request = $(form).ajaxSubmit();
    console.log(request);
  },
});
