const keys = require('../../config/keys');

module.exports = reasons => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>We are sorry!</h3>
          <p>Your credit has not been awarded for the following reasons</p>
          <p>${reasons}</p>
        </div>
      </body>
    </html>
  `;
};
