/**
 * Get a date object in the current user's timezone
 * @param  {String} serverTimezone The timezone the dateStr is in
 * @return {Date}                  A date object, adjusted to user's timezone
 */
function getUnixTimeInServerTimezone(serverTimezone) {
	// Get timezone offsets
	// This gets the difference in ms between the server time and the users current location
	let nowAsStringInServerTimezone = new Date().toLocaleString("en-US", {
		timeZone: serverTimezone,
	});
	let serverTimestamp = new Date(nowAsStringInServerTimezone).getTime();
	let userTimestamp = Date.now();
	let offset = userTimestamp - serverTimestamp;

	// Get a unix timestamp for the server date and add the offset
	let adjustedTimestamp = new Date().getTime() + offset;

	// Return a date object adjusted for the user's timezone
	return new Date(adjustedTimestamp);
}

let serverTimezone = "America/Chicago";

let unixTime = getUnixTimeInServerTimezone(serverTimezone);
let unixTimeMinutes = unixTime;
console.log(Math.floor(unixTime.getTime() / 1000));

// What I need to do here is round the Unix time to the nearest minute, which can then be used to set the CSS custom property "--acfes-current-time" with a grid row "time-<value>"
