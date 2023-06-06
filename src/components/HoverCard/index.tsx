import React, { useEffect, useState } from "react";
import { HoverCardProps } from "../../pages/Country/types";

type Props = {
  hoverCardInformation: HoverCardProps;
};

export const HoverCard = ({ hoverCardInformation }: Props) => {
  console.log("hci: ", hoverCardInformation);
  const { name, positionX, positionY, waitingApplications } =
    hoverCardInformation;
  return (
    <div
      className="bg-gray-100 py-4 px-8 text-xl font-semibold pointer-events-none rounded-sm shadow-md"
      style={{
        position: "absolute",
        top: positionY + "px",
        left: positionX + "px",
      }}
    >
      <div>{name}</div>
      <div>
        {waitingApplications && (
          <>
            <div>Bekleyen Başvuru: {waitingApplications.count}</div>
          </>
        )}
      </div>
    </div>
  );
};
