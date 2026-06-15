import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
	const {
		data: authUser,
		isLoading: isAuthLoading,
		error,
	} = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				console.log(error);
				return null;
			}
		},
	});

	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const isLoading = false;

	const user = {
		_id: "1",
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy2.png",
		coverImg: "/cover.png",
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		link: "https://youtube.com/@asaprogrammer_",
		following: ["1", "2", "3"],
		followers: ["1", "2", "3"],
	};

	const isMyProfile = authUser?._id === user?._id;

	const handleImgChange = (e, state) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				if (state === "coverImg") {
					setCoverImg(reader.result);
				}

				if (state === "profileImg") {
					setProfileImg(reader.result);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	// KEEP THE REST OF YOUR JSX RETURN EXACTLY AS IT IS

	return (
		<>
			{/* Your existing JSX */}
		</>
	);
};

export default ProfilePage;