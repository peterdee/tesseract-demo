/**
 * Handle the file selection
 */
$(document).ready(() => {
  $('#form').on('submit', async (event = {}) => {
    try {
      event.preventDefault();
      $('#error').empty();

      // check file
      const [file = null] = $('#file').prop('files');
      if (!file) {
        return false;
      }

      // create FormData and send request
      const fd = new FormData();
      fd.append('file', file);
      const response = await $.ajax({
        contentType: false,
        data: fd,
        processData: false,
        type: 'POST',
        url: '/upload',
      });

      // replace the DOM with a new page
      return document.write(response);
    } catch (error) {
      const { responseJSON: { info = '' } = {} } = error;
      if (info && info === 'MISSING_FILE') {
        return $('#error').empty().append('MISSING FILE!');
      }

      return $('#error').empty().append('ERROR!');
    }
  });
});
