export const checkRoute = ({ path, pattern }: { path: string; pattern: string }) => {
	const regex = new RegExp(`^/${pattern}(/|$)`);
	return regex.test(path);
};
