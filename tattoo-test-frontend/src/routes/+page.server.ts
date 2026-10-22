import type { PageServerLoad } from './$types';
import { getBuilderPage } from '#lib/server/getBuilderPage.ts';

export const load: PageServerLoad = async () => {
	return getBuilderPage('/tattoo/');
};