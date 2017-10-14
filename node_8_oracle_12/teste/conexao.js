var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "usuario",
    password      : "senha",
    connectString : "IP:PORTA/SERVICE"
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Conectou com sucesso!');

    connection.close(
      function(err)
      {
        if (err) {
          console.error(err.message);
          return;
        }
      });
  });