import dotenv from 'dotenv';

let initialized = false;

const init = async () => {
	if (initialized) {
		return;
	}

	dotenv.config({
		path: '.env',
	});

	initialized = true;
};

export default init;
