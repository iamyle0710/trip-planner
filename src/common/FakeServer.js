export default class FakeServer {
	static saveTrips(trips) {
		localStorage.setItem('trips', JSON.stringify(trips));
	}

	static loadTrips() {
		const data = localStorage.getItem('trips');
		const trips = data ? JSON.parse(data) : [];
		return Array.isArray(trips) ? trips : [];
	}
}
