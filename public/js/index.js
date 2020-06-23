/**
 * Handle the file selection
 */
$(document).ready(() => {
  $('#file').on('change', () => $('#error').empty());

  $('#form').on('submit', async (event = {}) => {
    try {
      event.preventDefault();
      $('#error').empty();

      // check file
      const [file = null] = $('#file').prop('files');
      if (!file) {
        return $('#error').append('PLEASE SELECT A FILE!');
      }
      
      // disable the 'Submit' button
      $('#submit').attr('disabled', true);

      // create FormData and send request
      const fd = new FormData();
      fd.append('file', file);
      const response = await $.ajax({
        contentType: false,
        data: fd,
        processData: false,
        type: 'POST',
        url: '/process',
      });

      // enable the 'Submit' button
      $('#submit').attr('disabled', false);

      // replace the DOM with a new page
      return document.write(response);
    } catch (error) {
      // enable the 'Submit' button
      $('#submit').attr('disabled', false);

      const { responseJSON: { info = '' } = {} } = error;
      if (info && info === 'MISSING_FILE') {
        return $('#error').empty().append('MISSING FILE!');
      }

      return $('#error').empty().append('ERROR!');
    }
  });
});
