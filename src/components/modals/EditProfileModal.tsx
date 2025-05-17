import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { editProfile } from "../../api/profile";
import { Button } from "../form/Button";
import ModalWrapper from "./ModalWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface EditProfileProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const EditProfileModal = ({ onClose, onSuccess }: EditProfileProps) => {
  const { accessToken, profile, refreshProfile } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar.url);
  const [bannerUrl, setBannerUrl] = useState(profile?.banner.url);
  const [bioText, setBioText] = useState(profile?.bio);
  const [venueManager, setVenueManager] = useState(profile?.venueManager);

  type ErrorState = {
    bannerUrl?: string;
    avatarUrl?: string;
    bioText?: string;
  };

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validateForm = () => {
      const newErrors: ErrorState = {};

      if (!/^https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/.test(bannerUrl!)) {
        newErrors.bannerUrl = "Banner image need to have a valid URL";
      }

      if (!/^https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/.test(bannerUrl!)) {
        newErrors.avatarUrl = "Avatar image need to have a valid URL";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (validateForm()) {
      setServerError("");

      if (
        avatarUrl &&
        bannerUrl &&
        bioText !== undefined &&
        venueManager !== undefined
      ) {
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
          setServerError("You must be logged in");
          return;
        }

        try {
          const result = await editProfile(
            profile!.name,
            userData,
            accessToken
          );
          if (result) {
            await refreshProfile();
            onSuccess?.();
            onClose();
          }
        } catch (error) {
          if (error instanceof Error) {
            setServerError(error.message);
          }
        }
      }
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="z-100 flex flex-col gap-10 w-1/2 bg-white p-10 border-1 border-neutral-500 rounded-xl"
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
        <div className="relative flex flex-col gap-1">
          <div className="w-full h-50 rounded-t-xl overflow-hidden">
            <img
              className="size-full object-cover"
              src={bannerUrl}
              alt={profile?.banner.alt}
            />
          </div>
          <div className="absolute top-37 left-10 size-40 rounded-l-xl overflow-hidden border-5 border-white">
            <img
              className="size-full object-cover"
              src={avatarUrl}
              alt={profile?.avatar.alt}
            />
          </div>
          <div className="pt-3 flex justify-between gap-3 w-full">
            <div className="w-1/2"></div>
            <div className="w-2/3 min-h-30 flex flex-col gap-3">
              <fieldset className="">
                <label htmlFor="banner">Banner</label>
                <input
                  className={errors.bannerUrl && "border-red-500"}
                  name="banner"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                ></input>
              </fieldset>
              <fieldset className="">
                <label htmlFor="avatar">Avatar</label>
                <input
                  className={errors.bannerUrl && "border-red-500"}
                  name="avatar"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                ></input>
              </fieldset>
            </div>
          </div>
          <div>
            <label htmlFor="bio">
              Bio <span className="italic">(max. 160 characters)</span>
            </label>
            <textarea
              className={`h-30 ${serverError && "border-red-500"}`}
              name="bio"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              maxLength={160}
            />
          </div>
          {Object.entries(errors).map(
            ([key, message]) =>
              message && (
                <p key={key} className="text-red-500">
                  {message}
                </p>
              )
          )}
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
              <label htmlFor="manager" className="cursor-pointer">
                Manager
              </label>
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
