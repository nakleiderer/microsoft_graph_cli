export interface IAuthProvider {
  getAccessToken: () => Promise<string | undefined>;
  ensureLoggedIn: () => Promise<void>;
}
