import { NavBar as NavBarPresentational } from "@presentational/NavBar/NavBar";
import { LinksMap } from "@presentational/NavBar/NavBarLinks";
import { useAuth } from "components/hooks/useAuth";
import { useMemo } from "react";

export const NavBar = () => {
	const { isLoggedIn, logout } = useAuth();

	const links = useMemo(() => {
		const links: LinksMap = {};
		if (isLoggedIn === true) {
			links["Home"] = "/";
			links["My Favorites"] = "/me/favorites";
			links["Logout"] = logout;
		} else {
			links["Home"] = "/";
			links["Login"] = "/login";
			links["Signup"] = "/signup";
		}

		return links;
	}, [isLoggedIn, logout]);

	return <NavBarPresentational logo="/static/react-logo.png" links={links} />;
};
