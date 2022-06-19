import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import productBatchService from "../Services/API/productBatchService";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 0.5,
    },
  ],
};

const Remain = (props) => {
  const [statisticData, setStatisticData] = useState([data, data, data]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await productBatchService.getStatistic();
    const data = response?.data;
    console.log("data check", data);
    const statistic = [];
    for (let i = 0; i < data.length; i++) {
      console.log("tmp", data[i]);
      console.log("sold", data[i].total - data[i].exported);
      console.log("export", data[i].exported);
      let outdate = 0;

      for (let j = 0; j < data[i].listProductBatches.length; j++) {
        console.log(
          "find =batch",
          data[i].listProductBatches[j].productBatchId
        );
        if (new Date(data[i].listProductBatches[j].dateExpiry) < new Date()) {
          outdate += data[i].listProductBatches[j].productQuantity;
          for (let k = 0; k < data[i].listProductExported.length; k++) {
            console.log(
              "find =export",
              data[i].listProductExported[k].productBatchId
            );
            if (
              data[i].listProductBatches[j].productBatchId ===
              data[i].listProductExported[k].productBatchId
            ) {
              console.log(
                "same",
                new Date().getTime(),
                "vd",
                new Date(data[i].listProductBatches[k].dateExpiry).getTime()
              );
              outdate -= data[i].listProductExported[k].productQuantity;
            }
          }
        }
      }
      const tmp = {
        labels: ["Expired", "Exported", "Remain"],
        datasets: [
          {
            label: "# of Votes",
            data: [
              outdate,
              data[i].exported,
              data[i].total - data[i].exported - outdate,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 0.5,
          },
        ],
      };
      statistic.push(tmp);
    }
    console.log("xong");
    setStatisticData(statistic);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      {statisticData?.length > 0 &&
        statisticData.map((item, index) => {
          return (
            <div key={index} className="items  w-50 h-50">
              <div>item {index + 1}</div>
              <Pie data={item} />
            </div>
          );
        })}
    </div>
  );
};

export default Remain;
