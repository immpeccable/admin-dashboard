import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CitiesLexiographic,
  CitiesPlaka,
  CityObjects,
} from "../../utils/CommonData/cities";
import { declineApplication, fetchApplications } from "./api";
import { ethers } from "ethers";
import { abi, address, SIGN_MESSAGE } from "../../utils/constants";
import { sign } from "crypto";

const AcceptIcon = require("../../utils/images/accept.png");
const CancelIcon = require("../../utils/images/cancel.png");

export const District = ({ account }: any) => {
  let { city_id, district_id } = useParams();
  let plakaId = parseInt(city_id!.slice(2));
  let cityName = CitiesPlaka[plakaId - 1];
  let lexId = CitiesLexiographic[cityName as keyof typeof CitiesLexiographic];
  let cityObject = CityObjects[lexId - 1];
  const districtName = cityObject.districts[parseInt(district_id!) - 1];
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationContext, setNotificationContext] = useState("");

  const [applicationType, setApplicationType] = useState<
    "accepted" | "waiting"
  >("waiting");
  const [applications, setApplications] = useState<any[]>([]);

  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();

  let contract = new ethers.Contract(address, abi, signer);

  const { data, status, error, refetch } = useQuery({
    enabled: false,
    queryFn: async () => {
      var signature = localStorage.getItem("wallet-signature")?.toString();
      if (!signature) {
        signature = await signer.signMessage(SIGN_MESSAGE);
      }

      console.log(signature);

      const publicKey = await signer.getAddress();
      console.log(city_id, district_id, signer, signature, account);
      console.log("fetching the applications... ");
      const res = await fetchApplications(
        city_id!,
        district_id!,
        signature,
        publicKey
      );
      console.log((res as any).data);
      return (res as any).data;
    },
    queryKey: [`fetch-district-${city_id}-${district_id}`],
    onSuccess: (data) => setApplications(data.waitingApplications),
  });

  const declineMutation = useMutation({
    mutationFn: async (applicationId: string) => {
      setIsNotificationOpen(true);
      setNotificationContext(
        "Your transaction is being processed, please hold on..."
      );
      var signature = localStorage.getItem("wallet-signature");
      if (!signature) {
        signature = await signer.signMessage(SIGN_MESSAGE);
      }
      const publicKey = await signer.getAddress();
      await declineApplication(publicKey, signature, applicationId);
      setNotificationContext("Application rejected successfully");
      setTimeout(() => {
        setIsNotificationOpen(false);
      }, 3000);
      refetch();
    },
  });

  async function handleAccept(
    districtKey: string,
    boxKey: string,
    address: string
  ) {
    setIsNotificationOpen(true);
    setNotificationContext(
      "Your transaction is being processed, please hold on..."
    );
    const transactionResponse = await contract.givePermission(
      districtKey,
      boxKey,
      address
    );
    console.log(transactionResponse);

    const tx = await transactionResponse.wait(1);
    console.log("hello world");

    setNotificationContext("Application accepted successfully");
    refetch();
    setTimeout(() => {
      setIsNotificationOpen(false);
    }, 3000);

    console.log(tx);
  }

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className=" flex flex-col my-16 items-center">
      <h1 className="text-2xl font-semibold text-center border-b-4 border-yellow-500 border-opacity-70 py-4">
        You can accept requests for {cityName}, {districtName} here!
      </h1>
      {
        <div
          id="toast-success"
          className={`flex ${
            isNotificationOpen ? "opacity-100 h-auto mt-12" : "opacity-0 h-0"
          } transition-all  items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-black`}
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-md font-normal">{notificationContext}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={() => setIsNotificationOpen(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      }

      {data && (
        <>
          <div className="flex flex-row mt-8">
            <div
              className={`hover:bg-slate-800  hover:bg-opacity-10 p-4 ${
                applicationType === "waiting" &&
                "border-b-4 border-yellow-500 text-lg font-semibold"
              }`}
              onClick={() => {
                setApplicationType("waiting");
                setApplications(data.waitingApplications);
              }}
              id="wrapper-waiting"
            >
              Waiting Applications
            </div>
            <div
              className={`hover:bg-slate-800 hover:bg-opacity-10 p-4 ${
                applicationType === "accepted" &&
                "border-b-4 border-yellow-500 text-lg font-semibold"
              }`}
              onClick={() => {
                setApplicationType("accepted");
                setApplications(data.acceptedApplications);
              }}
              id="wrapper-accepted"
            >
              Accepted Applications
            </div>
          </div>
          <table className="mt-16 border-4 border-yellow-500 border-opacity-50">
            <tr className="border-b-2 border-yellow-500 border-opacity-50">
              <th className="p-4 text-lg font-bold">Name</th>
              <th className="p-4 text-lg font-bold">Surname</th>
              <th className="p-4 text-lg font-bold">Phone</th>
              <th className="p-4 text-lg font-bold">TC Number</th>
              <th className="p-4 text-lg font-bold">Accept/Decline</th>
            </tr>
            {applications
              .slice()
              .reverse()
              .map((application: any, index: number) => (
                <tr
                  id={index.toString()}
                  className="p-2 border-b-2 border-yellow-500"
                >
                  <th className="p-4 opacity-60 font-medium">
                    {application.user.name}
                  </th>
                  <th className="p-4 opacity-60 font-medium">
                    {application.user.surname}
                  </th>
                  <th className="p-4 opacity-60 font-medium">
                    {application.user.phone}
                  </th>
                  <th className="p-4 opacity-60 font-medium">
                    {application.user.tc}
                  </th>
                  <th className="flex flex-row gap-8 p-4 items-center justify-center">
                    <button
                      onClick={() =>
                        handleAccept(
                          `1${application.cityCode}${application.countyCode}`,
                          application.boxId,
                          application.user.publicKey
                        )
                      }
                    >
                      <img
                        className="w-8 h-8"
                        src={AcceptIcon}
                        alt="accept-icon"
                      />
                    </button>
                    <button
                      onClick={() => declineMutation.mutate(application._id)}
                    >
                      <img
                        className="w-8 h-8 pointer-events-none"
                        src={CancelIcon}
                        alt="cancel-icon"
                      />
                    </button>
                  </th>
                </tr>
              ))}
          </table>
        </>
      )}
    </section>
  );
};
