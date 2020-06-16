const app = require("../app/index");
const PORT = 3000;

// const { start, end } = app.locals.engine;
// start();
// setTimeout(() => {
//   end();
// }, 5000);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
