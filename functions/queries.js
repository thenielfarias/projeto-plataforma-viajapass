const { Client } = require('pg');
const connectionString = 'postgresql://postgres:farias.8743@localhost:5432/viajapass_vendas';

const client = new Client({
	connectionString: connectionString
});
client.connect();

module.exports.insert = function (nome, email, telefone, checkin, pax, gb, destino, res, req) {
	const query = {
		text: 'INSERT INTO vendas(nome, email, telefone, checkin, pax, gb, destino) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
		values: [nome, email, telefone, checkin, pax, gb, destino]
	}
	
	if(!req.session.nome){
		client.query(query, (err, res2) => {
		  if (err) {
			console.log(err.stack);
		  } else {
				res.redirect('gateway-payment.html');
		  }
		});
	}
}
