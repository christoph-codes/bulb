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
 * Sets a local storage variable with a value and an expiration date.
 * @param key string of the key of the local storage value.
 * @param value can be any value that is wanted to save.
 * @param ttl The amount of time in milliseconds for the local storage values to be stored
 * @return Sets the value to a storage element in local storage.
 */
export const setWithExpiry = (key: string, value: any, ttl: number) => {
	const now = new Date();

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};
	if (!ttl) {
		localStorage.setItem(key, JSON.stringify(value));
	} else {
		localStorage.setItem(key, JSON.stringify(item));
	}
};
/**
 * Getter for a given local storage variable
 * @param key String of the variable saved in local storage
 * @returns returns the value of what was saved inside of a given local storage variable
 */
export const getWithExpiry = (key: string) => {
	const itemStr = localStorage.getItem(key);
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
			localStorage.removeItem(key);
			return null;
		}
	}
	return item.value;
};
/**
 * Kills the key and value of a local storage element.
 * @param key The string that the data was stored under in local storage
 */
export const clearItem = (key: string) => {
	localStorage.removeItem(key);
};