export interface GitHubUser {
  avatar_url: string;
  bio: null | string;
  blog: string;
  company: null | string;
  created_at: string; // ISO 8601 格式日期时间
  email: null | string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: null | boolean;
  html_url: string;
  id: number;
  location: null | string;
  login: string;
  name: null | string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: null | string;
  type: string; // "User"
  updated_at: string; // ISO 8601 格式日期时间
  url: string;
  user_view_type: string; // "public"
}