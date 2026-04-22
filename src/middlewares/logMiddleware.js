const logInfomations = (req, res, next) => {
  const data =
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
  console.log(`[${data}] ${req.method} ${req.url} pelo IP ${req.ip}`);
  next();
};

export default logInfomations;
