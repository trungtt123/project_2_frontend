import { useEffect, useState } from "react";
import axios from "../setups/custom_axios";
import moment from "moment";
const Layout = () => {
  const [covidList, setCovidList] = useState();
  const today = moment().startOf("day").toISOString(true);
  // const priorDate = today.subtract(1, "months"); nếu lấy ntn thì today=priotDate=(today-1)=> 2 ngày là 1
  const priorDate = moment()
    .startOf("day")
    .subtract(1, "months")
    .toISOString(true);
  const getCovidList = async () => {
    const list = await axios.get(`/vietnam?from=${priorDate}&to=${today}`);
    setCovidList(JSON.stringify(list));
  };
  useEffect(() => {
    getCovidList();
  }, []);
  return (
    <>
      <div className="main">{covidList} </div>
    </>
  );
};

export default Layout;
