const messagesError = {
  TOKEN_NECESSARIO: 401,
  DADOS_INVALIDOS: 400,
  DEU_RUIM: 500,
  SUCESS0: 201,
};

const ErroHandler = (err, _req, res, _next) => {
  const status = err[messagesError];
  res.status(status).json({ message });
};

module.exports = ErroHandler;