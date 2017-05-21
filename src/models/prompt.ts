import { Response } from '../../models/response';

export class Prompt {
	question: string;
	responses: Response[];
	max_choices: number;
}
