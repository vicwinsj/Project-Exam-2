import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { editProfile } from "../api/profile";
import { Button } from "./Button";
import ModalWrapper from "./ModalWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type AvatarProps = {
  url: string;
  alt: string;
};

type BannerProps = {
  url: string;
  alt: string;
};

type EditProps = {
  onClose: () => void;
  name: string;
  avatar: AvatarProps;
  banner: BannerProps;
  bio: string;
  manager: boolean;
};

const EditProfileModal = ({
  onClose,
  name,
  banner,
  avatar,
  bio,
  manager,
}: EditProps) => {
  const { accessToken } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState(avatar.url);
  const [bannerUrl, setBannerUrl] = useState(banner.url);
  const [bioText, setBioText] = useState(bio);
  const [venueManager, setVenueManager] = useState(manager);

  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const avatar = {
      url: avatarUrl,
      alt: "",
    };

    const banner = {
      url: bannerUrl,
      alt: "",
    };

    const userData = {
      avatar: avatar,
      banner: banner,
      bio: bioText,
      venueManager: venueManager,
    };

    if (!accessToken) {
      setServerError("Access token is missing");
      return;
    }

    try {
      const result = await editProfile(name, userData, accessToken);
      if (result) {
        onClose();
        location.reload();
      }
      // SUCCESS MESSAGE
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }
      console.log(serverError);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="z-20 flex flex-col gap-10 w-1/2 bg-white p-10 border-1 border-neutral-500 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl flex items-center justify-between">
          <h1 className=" text-black">Update profile</h1>
          <FontAwesomeIcon
            className="transition-colors duration-300 cursor-pointer text-neutral-500 hover:text-neutral-700"
            icon={faXmark}
            onClick={onClose}
          ></FontAwesomeIcon>
        </div>
        <div className="relative">
          <div className="w-full h-40 rounded-xl overflow-hidden">
            <img
              className="size-full object-cover"
              src={bannerUrl}
              alt={banner.alt}
            />
          </div>
          <div className="absolute top-25 left-10 size-40 rounded-r-xl rounded-l-full overflow-hidden border-3 border-sunset-800">
            <img
              className="size-full object-cover"
              src={avatarUrl}
              alt={avatar.alt}
            />
          </div>
          <div className="pt-3 flex justify-between gap-3 w-full">
            <div className="w-1/2"></div>
            <div className="w-2/3 min-h-30 flex flex-col gap-3">
              <fieldset className="">
                <label htmlFor="banner">Banner</label>
                <input
                  className={serverError && "border-red-500"}
                  name="banner"
                  value={banner.url}
                  onChange={(e) => setBannerUrl(e.target.value)}
                ></input>
              </fieldset>
              <fieldset className="">
                <label htmlFor="avatar">Avatar</label>
                <input
                  className={serverError && "border-red-500"}
                  name="avatar"
                  value={avatar.url}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                ></input>
              </fieldset>
            </div>
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              className={`h-30 ${serverError && "border-red-500"}`}
              name="bio"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              maxLength={200}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="manager"
                name="manager"
                checked={venueManager}
                onChange={(e) => setVenueManager(e.target.checked)}
              />
              <label htmlFor="Manager">Manager</label>
            </div>
            <Button type="submit" variant="secondary">
              Save
            </Button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditProfileModal;
