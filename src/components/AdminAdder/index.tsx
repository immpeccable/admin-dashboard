import React, { useEffect, useState } from "react";
import { I_ACCOUNT_PROPS } from "../Header/types";
import { ethers } from "ethers";
import { abi, address } from "../../utils/constants";
import { CitiesPlaka } from "../../utils/CommonData/cities";
import { CityObjects } from "../../utils/CommonData/cities";
import { CitiesLexiographic } from "../../utils/CommonData/cities";
import { CityObject } from "../../utils/CommonData/types";

export const AdminAdder = ({ account }: I_ACCOUNT_PROPS) => {
  const [newAdminAddress, setNewAdmin] = useState<string>("");
  const [newAdminValue, setAdminValue] = useState<number>(10000);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedCityCode, setSelectedCityCode] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);

  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();

  let contract = new ethers.Contract(address, abi, signer);

  const handleClick = async () => {
    try {
      const res = await contract.addAdmin(newAdminValue, newAdminAddress);

      console.log("RES: ", res);
    } catch (err: any) {
      setErrorMessage(err.error.data.message);
    }
  };

  const handleCitySelect = (e: any) => {
    setSelectedCityCode(parseInt(e.target.value));
    setSelectedCity(
      CitiesLexiographic[
        CitiesPlaka.at(
          parseInt(e.target.value) - 1
        ) as keyof typeof CitiesLexiographic
      ]
    );
    setAdminValue(10000 + 100 * parseInt(e.target.value));
  };

  const handleDistrictSelect = (e: any) => {
    setSelectedDistrict(e.target.value);
    setAdminValue(newAdminValue + parseInt(e.target.value));
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  }, [errorMessage]);

  return (
    <div
      className="w-1/2 py-4 px-8 text-xl font-semibold rounded-md"
      style={{}}
    >
      {errorMessage && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Wallet Address
        </label>
        <input
          type="text"
          id="first_name"
          value={newAdminAddress}
          onChange={(e) => setNewAdmin(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0x..."
          required
        />
      </div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Şehir Seçiniz
      </label>
      <select
        id="countries"
        onChange={(e) => handleCitySelect(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected value={"00"}>
          Tüm Şehirler
        </option>
        {CitiesPlaka.map((city, i) => {
          return (
            <option key={city} value={i + 1}>
              {city}
            </option>
          );
        })}
      </select>
      {selectedCity > 0 && (
        <>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ülke Seçini
          </label>
          <select
            id="countries"
            onChange={(e) => handleDistrictSelect(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={"00"}>
              Tüm İlçeler
            </option>
            {CityObjects[selectedCity - 1].districts.map((city, i) => {
              return (
                <option key={city} value={i + 1}>
                  {city}
                </option>
              );
            })}
          </select>
        </>
      )}
      <button
        onClick={() => handleClick()}
        className="min-w-full mt-8 mb-40 text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
      >
        Add Admin
      </button>{" "}
    </div>
  );
};
