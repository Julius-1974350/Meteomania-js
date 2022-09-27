import './load-env.js';

import app from './src/app.js';

const PORT = process.env.PORT;

app.listen(PORT, err => {
	if(err){
		process.exit(1);
	}
});