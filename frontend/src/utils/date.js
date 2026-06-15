export const formatPostDate = (createdAtDate) => {
	const createdAt = new Date(createdAtDate);
	const now = new Date();
	const timeDifferenceInSeconds = Math.floor((now - createdAt) / 1000);
	const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
	const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
	const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

	if (timeDifferenceInDays > 30) {
		return createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	} else if (timeDifferenceInDays > 0) {
		return `${timeDifferenceInDays}d`;
	} else if (timeDifferenceInHours > 0) {
		return `${timeDifferenceInHours}h`;
	} else if (timeDifferenceInMinutes > 0) {
		return `${timeDifferenceInMinutes}m`;
	} else {
		return "Just now";
	}
};

export const formatMemberSinceDate = (createdAtDate) => {
	if (!createdAtDate) return "";
	const date = new Date(createdAtDate);
	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	return `Joined ${month} ${year}`;
};
