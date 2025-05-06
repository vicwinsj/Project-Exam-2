import ModalWrapper from "./ModalWrapper";
import { Button } from "../form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
// import placeholderImage from "../../assets/placeholder_venue.png";
import { useAuth } from "../../contexts/AuthContext";
import { createVenue } from "../../api/venues";
import { useState } from "react";

interface CreateVenueProps {
  onClose: () => void;
}

export default function CreateVenue({ onClose }: CreateVenueProps) {
  const [serverError, setServerError] = useState("");
  const { accessToken, profile, refreshProfile } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages((prev) => [...prev, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const capacity = (form.elements.namedItem("capacity") as HTMLInputElement)
      .value;
    const rating = (form.elements.namedItem("rating") as HTMLSelectElement)
      .value;

    const wifi = (form.elements.namedItem("wifi") as HTMLInputElement).checked;
    const parking = (form.elements.namedItem("parking") as HTMLInputElement)
      .checked;
    const breakfast = (form.elements.namedItem("breakfast") as HTMLInputElement)
      .checked;
    const pets = (form.elements.namedItem("pets") as HTMLInputElement).checked;

    const address = (form.elements.namedItem("address") as HTMLInputElement)
      .value;
    const zip = (form.elements.namedItem("zip") as HTMLInputElement).value;
    const city = (form.elements.namedItem("city") as HTMLInputElement).value;
    const country = (form.elements.namedItem("country") as HTMLInputElement)
      .value;

    const media = images.map((url) => ({
      url,
      alt: "",
    }));

    const meta = {
      wifi,
      parking,
      breakfast,
      pets,
    };

    const location = {
      address,
      city,
      zip,
      country,
    };

    if (!accessToken) {
      setServerError("You must be logged in");
      return;
    }

    if (profile?.venueManager)
      try {
        const result = await createVenue(
          name,
          description,
          media,
          Number(price),
          Number(capacity),
          Number(rating),
          meta,
          location,
          accessToken
        );
        if (result) {
          await refreshProfile();
          onClose();
          console.log("created!");
        }
        // SUCCESS MESSAGE
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
        }
      }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="max-h-3/4 overflow-y-auto z-100 flex flex-col gap-10 w-1/2 bg-white p-10 border-1 border-neutral-500 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="transition-colors duration-300 text-xl flex items-center justify-end text-neutral-500 hover:text-neutral-700">
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faXmark}
            onClick={onClose}
          ></FontAwesomeIcon>
        </div>
        <h2 className="text-xl text-black">Create Venue</h2>
        <fieldset className="flex flex-col gap-3">
          <h3 className="text-black">Details</h3>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input name="name" id="name"></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              className="h-50"
              name="description"
              id="description"
            ></textarea>
          </div>
          <div className="w-1/2 flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="price">Price per night</label>
              <input className="" type="number" name="price" id="price"></input>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="capacity">Guest capacity</label>
              <input
                className=""
                type="number"
                name="capacity"
                id="capacity"
              ></input>
            </div>
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <h3 className="text-black">Star rating</h3>
          <select className="w-fit" name="rating" id="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <h3 className="text-black">Facilities</h3>
          <div className="w-full flex gap-3 justify-start">
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <input
                  className="cursor-pointer size-5"
                  type="checkbox"
                  id="wifi"
                  name="wifi"
                />
                <label htmlFor="wifi">Free wifi</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  className="cursor-pointer size-5"
                  type="checkbox"
                  id="parking"
                  name="parking"
                />
                <label htmlFor="parking">Free parking</label>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <input
                  className="cursor-pointer size-5"
                  type="checkbox"
                  id="breakfast"
                  name="breakfast"
                />
                <label htmlFor="breakfast">Breakfast included</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  className="cursor-pointer size-5"
                  type="checkbox"
                  id="pets"
                  name="pets"
                />
                <label htmlFor="pets">Pets allowed</label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <h3 className="text-black">Images</h3>
          <div className="flex items-end gap-3">
            <div className="w-full flex flex-col gap-1">
              <label className="hidden" htmlFor="image">
                Image URL
              </label>
              <input
                placeholder="Enter image URL here ..."
                name="image"
                id="image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></input>
            </div>
            <Button onClick={handleAddImage} type="button" variant="outline">
              Add image
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {images.map((url, idx) => (
              <div className="relative size-20 overflow-hidden">
                <img
                  key={idx}
                  src={url}
                  alt=""
                  className="size-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(idx)}
                  className="transition-all duration-300 bg-white cursor-pointer opacity-70 hover:opacity-100 rounded absolute right-1 top-1"
                >
                  <FontAwesomeIcon
                    className="size-5 text-red-500"
                    icon={faTrash}
                  ></FontAwesomeIcon>
                </button>
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <h3 className="text-black">Location</h3>
          <div className="flex gap-3">
            <div className="flex-2 flex flex-col gap-1">
              <label htmlFor="address">Address</label>
              <input name="address" id="address"></input>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="zip">ZIP</label>
              <input type="number" name="zip" id="zip"></input>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="city">City</label>
              <input name="city" id="city"></input>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="country">Country</label>
              <input name="country" id="country"></input>
            </div>
          </div>
        </fieldset>
        <Button type="submit">Create venue</Button>
        {serverError && <p className="text-red-500">{serverError}</p>}
      </form>
    </ModalWrapper>
  );
}
