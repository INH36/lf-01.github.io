import http from '@/utils/request/http';
import { GitHubUser } from '../type';

export const getUserInfo = async (user: string): Promise<GitHubUser> => {
	const res = await http.get(`/users/${user}`);
	return res.data;
};
