/**
 * Handle the file selection
 */
$(document).ready(() => {
  $('#form').on('submit', async (event = {}) => {
    try {
      event.preventDefault();

      // check file
      const [file = null] = $('#file').prop('files');
      if (!file) {
        return false;
      }

      // create FormData and send request
      const fd = new FormData();
      fd.append('file', file);
      return $.ajax({
        contentType: false,
        data: fd,
        processData: false,
        type: 'POST',
        url: '/process',
      });
    } catch (error) {
      return console.log('error', error);
    }
  });
});
