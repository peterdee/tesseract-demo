// Create a filename string
module.exports = (
  name = '',
) => `${name.split('.')[0]}.${name.split('.').slice(-1)}`;
