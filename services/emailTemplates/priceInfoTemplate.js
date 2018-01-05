module.exports = product => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Congratulations!</h3>
          <p>Here is your price info</p>
          <p>${product.name}</p>
        </div>
      </body>
    </html>
  `;
};
