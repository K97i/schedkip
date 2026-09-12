import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MOCK_COURSES } from '$lib/mock-data';

export const GET: RequestHandler = () => {
    return json(MOCK_COURSES);
};