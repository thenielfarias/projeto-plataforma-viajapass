const { Client } = require('pg');
const connectionString = 'postgresql://postgres:farias.8743@localhost:5432/viajapass_vendas_fln';

const client = new Client({
	connectionString: connectionString
});
client.connect();

module.exports.insert = function (nome, email, telefone, checkin, pax, gb, res, req) {
	const query = {
		text: 'INSERT INTO vendas_fln(nome, email, telefone, checkin, pax, gb) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;',
		values: [nome, email, telefone, checkin, pax, gb]
	}
	
	if(!req.session.nome){
		client.query(query, (err, res2) => {
		  if (err) {
			console.log(err.stack);
		  } else {
				res.redirect('thanks.html');
		  }
		});
	}
}
