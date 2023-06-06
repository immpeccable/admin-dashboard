import { ENDPOINT } from "./../../../utils/constants/index";
import axios from "axios";
import { SIGN_MESSAGE } from "./../../../utils/constants/index";

export async function fetchApplications(
  cityCode: string,
  districtCode: string,
  signature: string,
  publicKey: string
) {
  console.log("hello world!!!");
  const response = await axios.get(`${ENDPOINT}/get-applications`, {
    params: {
      districtCode:
        districtCode.length === 1 ? `0${districtCode}` : districtCode,
      cityCode: cityCode.slice(2),
      signature: signature,
      publicKey: publicKey,
      signMessage: "sign",
    },
  });
  console.log("get response: ", response);
  return response;
}

export async function declineApplication(
  publicKey: string,
  signature: string,
  applicationId: string
) {
  const response = await axios.post(`${ENDPOINT}/decline-application`, {
    publicKey: publicKey,
    signature: signature,
    signMessage: SIGN_MESSAGE,
    applicationId: applicationId,
  });
  console.log("decline response: ", response);
}

export async function getApplicationCounts(
  applicationType: string | undefined,
  cityCode?: string | number
) {
  console.log("APPLCATON TYPE : ", applicationType);
  const response = await axios.get(`${ENDPOINT}/countryapplication-count`, {
    params: {
      cityCode: cityCode,
      applicationType: applicationType,
    },
  });
  return response;
}
