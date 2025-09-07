async function selectOne<T>(query: Promise<T[]>) {
	const result = await query;

	return result.length > 0 ? result[0] : null;
}

export { selectOne };
