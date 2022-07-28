/**
 * Converts a timestamp date object into a readable format
 * @param timestamp Timestamp object from the Date object
 * @returns string in the format `${mm}/${dd}/${yyyy}`
 */
export const convertTimestamp = (timestamp: any) => {
	let date = timestamp.toDate();
	const mm = date.getMonth() + 1;
	const dd = date.getDate();
	const yyyy = date.getFullYear();

	date = `${mm}/${dd}/${yyyy}`;
	return date;
};

/**
 * Sets a session storage variable with a value and an expiration date.
 * @param key string of the key of the session storage value.
 * @param value can be any value that is wanted to save.
 * @param ttl The amount of time in milliseconds for the session storage values to be stored
 * @return Sets the value to a storage element in session storage.
 */
export const setWithExpiry = (key: string, value: any, ttl: number) => {
	const ISSERVER = typeof window === "undefined";
	const now = new Date();

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};
	if (!ttl) {
		if (!ISSERVER) {
			window.sessionStorage.setItem(key, JSON.stringify(value));
		}
	} else {
		window.sessionStorage.setItem(key, JSON.stringify(item));
	}
};
/**
 * Getter for a given session storage variable
 * @param key String of the variable saved in session storage
 * @returns returns the value of what was saved inside of a given session storage variable
 */
export const getWithExpiry = (key: string) => {
	const ISSERVER = typeof window === "undefined";
	if (!ISSERVER) {
		const itemStr = window.sessionStorage.getItem(key);
		// if the item doesn't exist, return null
		if (!itemStr) {
			return null;
		}
		const item = JSON.parse(itemStr);
		const now = new Date();
		if (item.expiry) {
			// compare the expiry time of the item with the current time
			if (now.getTime() > item.expiry) {
				// If the item is expired, delete the item from storage
				// and return null
				window.sessionStorage.removeItem(key);
				return null;
			}
		}
		return item.value;
	}
};
/**
 * Kills the key and value of a session storage element.
 * @param key The string that the data was stored under in session storage
 */
export const clearItem = (key: string) => {
	const ISSERVER = typeof window === "undefined";
	if (!ISSERVER) {
		window.sessionStorage.removeItem(key);
	}
};