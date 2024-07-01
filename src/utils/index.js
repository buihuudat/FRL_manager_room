import { baseURL, tokenCybersoft } from "../services/axiosClient";
import { getsLocationService } from "../services/locationService";
import { getData } from "./storage";

export const convertDateToISO = (dateString) => {
  if (!dateString) return dateString;
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

export const uploadImage = async (img) => {
  let id = null;
  await getsLocationService().then((res) => (id = res[res?.length - 1].id));
  const formData = new FormData();
  formData.append("formFile", img);
  try {
    const res = await fetch(
      `${baseURL}/vi-tri/upload-hinh-vitri?maViTri=${id}`,
      {
        method: "POST",
        headers: {
          token: getData("token"),
          tokenCybersoft,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    return res?.content?.hinhAnh;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
