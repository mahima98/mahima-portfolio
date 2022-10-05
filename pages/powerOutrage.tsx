import Head from "next/head";
import { Key, useEffect, useState } from "react";
import { ImPower } from "react-icons/im";
export interface product {
  id: string;
  brand: string;
  category: string;
}

export interface Countries {
  id: string;
  date?: string;
  district: string;
  from: string;
  to: string;
}

const API_ENDPOINT =
  "https://raw.githubusercontent.com/MrSunshyne/mauritius-dataset-electricity/main/data/power-outages.json";
// const API_ENDPOINT = "https://dummyjson.com/products/category/smartphones";

function powerOutrage() {
  const [loadedOutrages, setLoadedOutrages] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => {
        return response.json();
      })
      .then((data) => setLoadedOutrages(data));
  }, []);

  const countryList = loadedOutrages;

  // key : "Values"
  // Get array values
  const items = Object.values(countryList).map((value) => {
    console.log(countryList[value]);
    return value;
  });

  // Get array keys
  const itemsKeys = Object.keys(countryList).map((key) => {
    return key;
  });

  console.log(itemsKeys);

  return (
    <>
      <Head>
        <title>Power Outrages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="power-outrage dark:bg-gray-600 pt-4">
        <div className="p-6 flex flex-col gap-4 max-w-7xl mx-auto">
          <h1
            className="font-medium text-4xl text-center pb-4"
            style={{ textShadow: "#30D5C8 1px 0 8px" }}
          >
            Power Outrage Mauritius
          </h1>
          {Object.keys(countryList).map((key, i: Key) => (
            <div
              key={i}
              className="p-4 bg-gray-100 dark:bg-gray-400 rounded-lg flex flex-col gap-4 "
            >
              <div className="flex items-center gap-4">
                <div className="font-bold text-xl uppercase tracking-wide">
                  {key}
                </div>
                <ImPower />
              </div>
              <div className="">
                {items[i]
                  .slice(0)
                  .reverse()
                  .slice(0, 10)
                  .map(
                    (
                      value: { district: string; from: string; to: string },
                      i: Key
                    ) => (
                      <div
                        key={i}
                        className="p-4 m-1 bg-gray-200 dark:bg-gray-500 inline-block rounded-lg text-gray-900 dark:text-gray-900"
                      >
                        <div>{value.district}</div>
                        <div>
                          from ({" "}
                          {new Intl.DateTimeFormat("en-GB", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }).format(new Date(value.from))}
                          )
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default powerOutrage;