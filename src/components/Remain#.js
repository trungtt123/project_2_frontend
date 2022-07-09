import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import productBatchService from "../Services/API/productBatchService";
import ModalHistory from "./ModalHistory.tsx";
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
const style = {
  canvas: {
    transform: "scale(0.5)",
  },
};

const Remain = (props) => {
  const [statisticData, setStatisticData] = useState([data, data, data]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [dataRemain, setDataRemain] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await productBatchService.getStatistic();
    const data = response?.data;
    console.log("data check", data);
    setDefault(data).then((res) => {
      console.log("res", res);
      setDataRemain(res);
    });
  };
  const setDefault = async (data) => {
    return new Promise((resolve, reject) => {
      try {
        const statistic = [];
        for (let i = 0; i < data.length; i++) {
          console.log("tmp", data[i]);
          console.log("sold", data[i].total - data[i].exported);
          console.log("export", data[i].exported);
          let outdate = 0;
          data[i].listOutdated = [];
          for (let j = 0; j < data[i].listProductBatches.length; j++) {
            console.log(
              "find =batch",
              data[i].listProductBatches[j].productBatchId
            );
            if (
              new Date(data[i].listProductBatches[j].dateExpiry) < new Date()
            ) {
              outdate += data[i].listProductBatches[j].productQuantity;
              let exportInBatch = 0;
              for (let k = 0; k < data[i].listProductExported.length; k++) {
                console.log(
                  "find =export",
                  data[i].listProductExported[k].productBatchId
                );
                if (
                  data[i].listProductBatches[j].productBatchId ===
                    data[i].listProductExported[k].productBatchId &&
                  data[i].listProductBatches[j].productBatchProductId ===
                    data[i].listProductExported[k].productBatchProductId
                ) {
                  console.log(
                    "same",
                    new Date().getTime(),
                    "vd",
                    new Date(data[i].listProductBatches[k].dateExpiry).getTime()
                  );
                  exportInBatch +=
                    data[i].listProductExported[k].productQuantity;
                  outdate -= data[i].listProductExported[k].productQuantity;
                }
              }
              console.log("outdateinba", exportInBatch);
              console.log("cid", data[i].listProductBatches[j].productQuantity);
              data[i].listOutdated.push({
                ...data[i].listProductBatches[j],
                productQuantity:
                  data[i].listProductBatches[j].productQuantity - exportInBatch,
              });
            }
          }
          data[i].outdate = outdate;
          console.log(data[i]);
          let nothing = 0;
          if (data[i].total === 0) {
            nothing = 0.0001;
          }
          const tmp = {
            labels: ["Expired", "Exported", "Remain", "Nothing"],
            datasets: [
              {
                label: data[i].productId,
                data: [
                  outdate,
                  data[i].exported,
                  data[i].total - data[i].exported - outdate,
                  nothing,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(236, 236, 236, 1)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(189, 195, 199, 1)",
                ],
                borderWidth: 0.5,
              },
            ],
          };
          statistic.push(tmp);
        }
        console.log("xong");
        setStatisticData(statistic);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  };
  const handleClose = () => {
    setIsShowModal(false);
  };
  const setShowData = (productId, type) => {
    let search = "";
    switch (type) {
      case "Expired":
        search = "listOutdated";
        break;
      case "Exported":
        search = "listProductExported";
        break;
      default:
        search = "listProductBatches";
        break;
    }

    for (let i = 0; i < dataRemain.length; i++) {
      console.log(+productId, "data", dataRemain[i].productId);
      if (dataRemain[i].productId === +productId) {
        console.log("checko", search, dataRemain[i][search]);
        setHistoryData(dataRemain[i][search]);
      }
    }
    setIsShowModal(!isShowModal);
  };
  console.log("render remain");
  return (
    <div className="container row mx-auto">
      {statisticData?.length > 0 &&
        statisticData.map((item, index) => {
          return (
            <div key={index} className="items col-4">
              <div>item {index + 1}</div>
              <Pie
                data={item}
                options={{
                  // This chart will not respond to mousemove, etc
                  events: ["click", "mousemove", "mouseout"],
                  onClick: (e, activeEls) => {
                    let datasetIndex = activeEls[0].datasetIndex;
                    let dataIndex = activeEls[0].index;
                    let datasetLabel =
                      e.chart.data.datasets[datasetIndex].label;
                    let value =
                      e.chart.data.datasets[datasetIndex].data[dataIndex];
                    let label = e.chart.data.labels[dataIndex];
                    console.log("In click", datasetLabel, label, value);
                    setShowData(datasetLabel, label);
                  },
                }}
              />
            </div>
          );
        })}
      <ModalHistory
        show={isShowModal}
        data={historyData}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Remain;
