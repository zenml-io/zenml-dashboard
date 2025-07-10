export type GithubDirectory = GithubDirectoryItem[];

export interface GithubDirectoryItem {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url: any;
	type: string;
	_links: Links;
}

export interface Links {
	self: string;
	git: string;
	html: string;
}
