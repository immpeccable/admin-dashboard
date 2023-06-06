import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CitiesLexiographic,
  CitiesPlaka,
  CityObjects,
} from "../../utils/CommonData/cities";
import { SVGS } from "../../utils/CountryCitySVG's";
import { i_City } from "./types";
import { useNavigate } from "react-router-dom";
import { HoverCardProps } from "../Country/types";
import { HoverCard } from "../../components/HoverCard";
import { getApplicationCounts } from "../District/api";
import { I_APPLICATION_COUNT } from "../../components/Header/types";

export const City = () => {
  const navigate = useNavigate();
  const { city_id: id, status: status, color: color } = useParams();
  const plakaId = parseInt(id!.slice(2));
  const cityName = CitiesPlaka[plakaId - 1];
  let lexId = CitiesLexiographic[cityName as keyof typeof CitiesLexiographic];
  const [isHoverCardVisible, setIsHoverCardVisible] = useState<boolean>(false);
  const [cityApplications, setCityApplications] = useState([]);
  const [isCityInformationReady, setIsCityInformationReady] = useState(false);
  const [hoverCardInformation, setHoverCardInformation] =
    useState<HoverCardProps>({
      name: "",
      positionX: 0,
      positionY: 0,
      waitingApplications: { count: 0 },
    });

  async function handleCityHover(
    name: string,
    pageX: number,
    pageY: number,
    districtId: number
  ) {
    console.log("district id: ", districtId);
    let districtCode = (districtId + 1).toString();
    if (districtId < 9) {
      districtCode = "0" + districtCode;
    }
    console.log("city applications: ", cityApplications, "i: ", districtCode);
    const districtInfo = { count: 0 };
    console.log(districtCode);
    const dstr = cityApplications.find(
      (e: any) => e._id.toString() === districtCode
    );
    if (dstr) {
      districtInfo.count = dstr["count"];
    }

    let newHoverCard: HoverCardProps = {
      name: name,
      positionX: pageX,
      positionY: pageY,
      waitingApplications: {
        count: districtInfo.count,
      },
    };
    setHoverCardInformation(newHoverCard);
    !isHoverCardVisible && setIsHoverCardVisible(true);
  }

  useEffect(() => {
    if (!isCityInformationReady) return;
    let cityObject: i_City = CityObjects[lexId - 1];

    let max_applications = 0;
    cityApplications.forEach((e: I_APPLICATION_COUNT) => {
      max_applications = Math.max(max_applications, e.count);
    });

    for (let i: number = 0; i < cityObject.num_of_districts; i++) {
      let districtName = CityObjects[lexId - 1].districts[i];

      let districtObject = document.getElementById(
        (i + cityObject.start).toString()
      );
      console.log(districtObject);

      console.log(districtName);
      districtObject?.addEventListener("mousemove", (event: MouseEvent) => {
        handleCityHover(districtName, event.pageX, event.pageY, i);
      });
      districtObject?.addEventListener("mouseleave", () => {
        setIsHoverCardVisible(false);
      });
      districtObject?.addEventListener("click", () => {
        navigate(`/ilce/${id}/${i + 1}`);
      });

      let application_cnt = 0;

      let districtCode = (i + 1).toString();
      if (i < 9) {
        districtCode = "0" + districtCode;
      }

      const dstr = cityApplications.find(
        (e: any) => e._id.toString() === districtCode
      );
      if (dstr) {
        application_cnt = dstr["count"];
      }

      let opacity = 0.3 + 0.7 * (application_cnt / max_applications);
      districtObject?.setAttribute("opacity", opacity.toString());
    }

    return () => {
      for (
        let i: number = cityObject.start;
        i < cityObject.start + cityObject.num_of_districts;
        i++
      ) {
        let districtObject = document.getElementById(i.toString());
        districtObject?.removeEventListener("mousemove", () => { });
        districtObject?.removeEventListener("mouseleave", () => { });
        districtObject?.removeEventListener("click", () => { });
      }
    };
  }, [isCityInformationReady]);

  useEffect(() => {
    async function fetchCityApplications() {
      let lexCode = plakaId.toString();
      if (plakaId < 9) {
        lexCode = "0" + lexCode;
      }
      console.log("LEX CODE:  ", lexCode);
      const cityApplicationInformation = (
        await getApplicationCounts(status, lexCode)
      ).data.waitingApplication;
      console.log(cityApplicationInformation);
      setCityApplications(cityApplicationInformation);
      setIsCityInformationReady(true);
    }
    fetchCityApplications();
  }, []);

  return (
    <div className="mt-20 flex flex-col items-center gap-20">
      <h1 className="text-xl font-semibold">
        You can accept the admin request for {cityName} from here
      </h1>
      <div className={color}>{SVGS[plakaId]}</div>
      {isHoverCardVisible && (
        <HoverCard hoverCardInformation={hoverCardInformation!} />
      )}
    </div>
  );
};
