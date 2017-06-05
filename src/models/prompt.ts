import { Response } from '../../models/response';

export class Prompt {
	question: string;
	responses: string[];
	max_choices: number;
}
