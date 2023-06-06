import React, { FC, useEffect, useState } from "react";
import { SVGS } from "../../utils/CountryCitySVG's";
import { CitiesLexiographic } from "../../utils/CommonData/cities";
import { CitiesPlaka } from "../../utils/CommonData/cities";
import { HoverCardProps } from "./types";
import { useNavigate } from "react-router-dom";
import { HoverCard } from "../../components/HoverCard";
import { AdminAdder } from "../../components/AdminAdder";
import {
  I_ACCOUNT_PROPS,
  I_APPLICATION_COUNT,
  I_COUNTRY_PROPS,
} from "../../components/Header/types";
import { getApplicationCounts } from "../District/api";

export const Country = ({
  account,
  applicationType,
  color,
}: I_COUNTRY_PROPS) => {
  const [isHoverCardVisible, setIsHoverCardVisible] = useState<boolean>(false);
  const [hoverCardInformation, setHoverCardInformation] =
    useState<HoverCardProps>();
  const [waitingApplications, setWaitingApplications] = useState<
    any[] | undefined
  >();
  const [maxCount, setMaxCount] = useState<number>(0);
  const navigate = useNavigate();

  const getApplicationCountsAndSet = async () => {
    const res: any = await getApplicationCounts(applicationType);

    setWaitingApplications(res.data.waitingApplication);
    console.log(res.data);
    setMaxCount(
      res.data.waitingApplication
        ?.sort((a1: any, a2: any) => a2.count - a1.count)
        .at(0).count || 0
    );
  };

  const handleCityHover = (id: number, pageX: number, pageY: number) => {
    !isHoverCardVisible && setIsHoverCardVisible(true);
    let newHoverCard: HoverCardProps = {
      name: CitiesPlaka[id - 1],
      positionX: pageX,
      positionY: pageY,
      waitingApplications: waitingApplications?.find(
        (e: any) => parseInt(e._id) === id
      ),
    };
    setHoverCardInformation(newHoverCard);
  };

  const handleCityClick = (id: number) => {
    let city_id: string = "c_";
    if (id < 10) {
      city_id += "0";
    }
    city_id += id.toString();
    return navigate(`sehir/${city_id}/${applicationType}/${color}`);
  };
  useEffect(() => {
    for (let i = 1; i < 82; i++) {
      let cityObject1, cityObject2;

      var cityVal = waitingApplications?.find(
        (e: any) => parseInt(e._id) === i
      );
      var colorVal = 0;
      if (cityVal) {
        colorVal = cityVal.count;
      }

      if (i === 17 || i === 34) {
        // this is where dynamic hover card mouse events are implemented specifically for canakkale and istanbul
        cityObject1 = document.getElementById("c" + i + "_1");
        cityObject2 = document.getElementById("c" + i + "_2");
        cityObject1?.setAttribute(
          "opacity",
          (0.1 + colorVal / maxCount).toString()
        );
        cityObject2?.setAttribute(
          "opacity",
          (0.1 + colorVal / maxCount).toString()
        );
      } else {
        // this is where dynamic hover card mouse events are implemented for remaining cities
        cityObject1 = document.getElementById("c" + i);
        cityObject1?.setAttribute(
          "opacity",
          (0.1 + colorVal / maxCount).toString()
        );
      }

      cityObject1?.addEventListener("mousemove", (event: MouseEvent) => {
        handleCityHover(i, event.pageX, event.pageY);
      });
      cityObject1?.addEventListener("mouseleave", (event: MouseEvent) => {
        setIsHoverCardVisible(false);
      });
      cityObject1?.addEventListener("click", (event: MouseEvent) => {
        handleCityClick(i);
      });
      cityObject2?.addEventListener("mousemove", (event: MouseEvent) => {
        handleCityHover(i, event.pageX, event.pageY);
      });
      cityObject2?.addEventListener("mouseleave", (event: MouseEvent) => {
        setIsHoverCardVisible(false);
      });
      cityObject2?.addEventListener("click", (event: MouseEvent) => {
        handleCityClick(i);
      });
    }

    return () => {
      for (let i = 1; i < 82; i++) {
        let cityObject = document.getElementById("c" + i);
        cityObject?.removeEventListener("mousemove", () => {});
        cityObject?.removeEventListener("mouseleave", () => {});
        cityObject?.addEventListener("click", () => {});
      }
    };
  }, [waitingApplications]);

  useEffect(() => {
    getApplicationCountsAndSet();
  }, []);

  return (
    <div className="realtive">
      <section className=" mt-20 flex flex-col items-center justify-center">
        <div className={"w-full " + color}>{SVGS[0]}</div>
        {isHoverCardVisible && (
          <HoverCard hoverCardInformation={hoverCardInformation!} />
        )}
        <AdminAdder account={account} />
      </section>
    </div>
  );
};
