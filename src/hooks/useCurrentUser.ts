import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function useCurrentUser() {
	const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

	setTimeout(() => {
		setCurrentUser("time over");
	}, 5000);

	return {
		currentUser,
	};
}

export default useCurrentUser;
