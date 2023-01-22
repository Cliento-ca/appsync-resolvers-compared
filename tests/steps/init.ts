import * as AWS from 'aws-sdk';
import { promisify } from 'util';
import awscred from 'awscred';
import dotenv from 'dotenv';

dotenv.config();

let initialized = false;

const init = async () => {
	if (initialized) {
		return;
	}

	const profileArg = process.argv.find((arg) => arg.includes('profile'));
	const profile = profileArg ? profileArg.split('=')[1] : process.env.AWS_PROFILE || 'default';

	const creds = new AWS.SharedIniFileCredentials({ profile });

	AWS.config.credentials = creds;
	AWS.config.region = process.env.AWS_REGION || 'ca-central-1';

	initialized = true;
};

export default init;
