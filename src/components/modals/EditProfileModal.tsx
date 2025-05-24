import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { editProfile } from "../../api/profile";
import { Button } from "../form/Button";
import ModalWrapper from "./ModalWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonLoader } from "../loaders/ButtonLoader";
import { Toast } from "../toast/toast";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);

  type ErrorState = {
    bannerUrl?: string;
    avatarUrl?: string;
    bioText?: string;
  };

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

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
          toast.custom(<Toast error={true} message={serverError} />);
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
            toast.custom(<Toast error={true} message={serverError} />);
          }
        }
        setLoading(false);
      }
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="mx-1 z-100 flex flex-col gap-10 w-full sm:w-2/3 lg:w-1/2 bg-white p-6 sm:p-10 border-1 border-neutral-500 rounded-xl"
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
          <div className="w-full h-30 sm:h-40 lg:h-50 rounded-t-xl overflow-hidden">
            <img
              className="size-full object-cover"
              src={bannerUrl}
              alt={profile?.banner.alt}
            />
          </div>
          <div className="absolute top-20 sm:top-28 lg:top-37 left-10 size-25 sm:size-28 md:size-33 lg:size-35 rounded-l-xl overflow-hidden border-5 border-white">
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
        </div>
        <div>
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
            <Button
              className={`${loading && "cursor-not-allowed bg-ocean-700/50"}`}
              type="submit"
              variant="secondary"
            >
              {loading ? (
                <ButtonLoader buttonText="Saving Profile ..." />
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditProfileModal;
