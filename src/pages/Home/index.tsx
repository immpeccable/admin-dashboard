import React, { useState, useEffect } from "react";
import { I_HEADER_PROPS } from "../../components/Header/types";
import { Country } from "../Country";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { SIGN_MESSAGE } from "../../utils/constants";

const HomePage = ({ account, setAccount }: I_HEADER_PROPS) => {
  const MetamaskIcon = require("../../utils/images/metamask.png");
  const WalletConnectIcon = require("../../utils/images/walletconnect.png");

  const [mapState, setMapState] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    async function onLoad() {
      await connectMetamask();
    }
    onLoad();
    window.ethereum!.on("accountsChanged", (accounts: any) => {
      setAccount(accounts[0]);
      localStorage.removeItem("wallet-signature");
    });
  }, []);

  async function connectMetamask() {
    const accounts = await window.ethereum!.request({
      method: "eth_requestAccounts",
    });

    let walletSignature = localStorage.getItem("wallet-signature");

    if (!walletSignature) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      const signature = await signer.signMessage(SIGN_MESSAGE);

      localStorage.setItem("wallet-signature", signature);
      console.log(signature);
    }

    if ((accounts as any[]).length > 0) {
      setAccount((accounts as any[])[0]);
    }
  }

  const handleMapSwitch = (mI: number) => {
    setMapState(mI);
    console.log(mapState);
  };

  return (
    <>
      {account ? (
        <div>
          <div className="w-[95%] mx-auto md:w-full bg-slate-50 border-2 rounded-md font-normal">
            <nav className="flex flex-col md:flex-row justify-between mr-3 ml-3">
              <div
                onClick={() => {
                  navigate("/profile");
                }}
                className="text-black hover:text-blue-500 p-3 ml-3 cursor-pointer"
              >
                <i className="fa-regular fa-user"></i> My Profile
              </div>
              <div className="text-black hover:text-blue-500 p-3 ml-3 cursor-pointer">
                <i className="fa-duotone fa-arrow-progress"></i> Transactions
              </div>
              <div
                className="text-black hover:text-blue-500 p-3 ml-3 cursor-pointer"
                onClick={() => handleMapSwitch(1)}
              >
                <i className="fa-regular fa-code-pull-request"></i> Requests
              </div>
              <div
                className="text-black hover:text-blue-500 p-3 ml-3 cursor-pointer"
                onClick={() => handleMapSwitch(2)}
              >
                <i className="fa-sharp fa-regular fa-universal-access"></i>
                Granted users
              </div>
            </nav>
          </div>
          {mapState === 1 && (
            <Country account={account} applicationType="waiting" color="blue" />
          )}
          {mapState === 2 && (
            <Country
              account={account}
              applicationType="accepted"
              color="redd"
            />
          )}
        </div>
      ) : (
        <div>
          <div className="text-lg text-center mt-8">
            <h1 className="">
              Welcome to decentralized authorization platform for REVO project.
            </h1>
            <h1 className="">
              This application requires a connection to your Web3 wallet.
            </h1>
            <h1>For detailed information, visit: http://revo.com</h1>
            <h1 className="mt-8 font-bold">
              Please use one of the option below to establish a secure
              connection to your wallet.
            </h1>
          </div>

          <div className="flex flex-row mt-8 gap-3 justify-center">
            <div
              onClick={connectMetamask}
              className="basis-1/5 flex flex-col bg-slate-50 rounded-xl items-center text-center p-3 border-2 border-solid hover:border-blue-500"
            >
              <div className="w-[40%] h-[80%]">
                <img src={MetamaskIcon} className="h-full w-full"></img>
              </div>
              <h1 className="text-lg">Metamask</h1>
            </div>
            <div
              onClick={() => {
                alert("WalletConnect is not supported yet...");
              }}
              className="basis-1/5 flex flex-col bg-slate-50 border-2 border-solid rounded-xl items-center text-center p-3 hover:border-blue-500"
            >
              <div className="w-[40%] h-[80%]">
                <img src={WalletConnectIcon} className="h-full w-full"></img>
              </div>
              <h1 className="text-lg">WalletConnect</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
