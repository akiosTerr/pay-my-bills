import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import "style/history.scss";
import { convertDate, orderedMonths } from "utils/general_utils";
import HistoryItem from "components/historyItem";
import { HistoryItemType } from "components/interfaces/interfaces";
import PieChartComponent from "./pieChart";

interface HistoryArrayPropType {
  historyItemArrayProp: HistoryItemType[];
}

interface monthOptionValues {
  monthLabel: string;
  monthValue: number;
  expirationDate: Date;
}

function History({ historyItemArrayProp }: HistoryArrayPropType) {
  const [allFilterMonths, setAllFilterMonths] = useState<monthOptionValues[]>(
    []
  );
  const [currentFilterMonth, setCurrentFilterMonth] = useState<monthOptionValues | undefined>(undefined);
  useEffect(() => {
    console.log("render useeffect")
    if (allFilterMonths.length === 0) {
      setMonthValues();
    }
  }, [historyItemArrayProp]);

  const handleSelectChange  = (e: any) => {
    const newValue = e.target.value;
    const filterMonth = allFilterMonths.find((item) => {
      return item.monthLabel === e.target.value;
    });
    setCurrentFilterMonth(filterMonth);
    e.target.value = newValue
  };

  const setMonthValues = () => {
    console.log("set month values");

    const monthValues = historyItemArrayProp.map((item) => {
      const expirationDate = new Date(convertDate(item.expirationDate));
      const monthValue = expirationDate.getMonth();
      const monthLabel = `${
        orderedMonths[monthValue]
      } - ${expirationDate.getFullYear()}`;
      return {
        monthLabel,
        monthValue,
        expirationDate,
      };
    });

    const uniqueArray = uniqBy(monthValues, "monthLabel");
    uniqueArray.sort((a, b) => {
      var c = a.expirationDate;
      var d = b.expirationDate;
      //@ts-ignore
      return d - c;
    });
    setAllFilterMonths(uniqueArray);
    setCurrentFilterMonth(uniqueArray[0]);
  };
  const filteredArrayProps = historyItemArrayProp.filter((item) => {
    const itemDate = new Date(convertDate(item.expirationDate));
    return itemDate.getMonth() === currentFilterMonth?.monthValue;
  });

  const getCurrentMonthFilter = () => {
    if(currentFilterMonth){
      return currentFilterMonth.monthLabel
    } 
  }

  function DisplayMonthFilter() {
    if (allFilterMonths.length > 0) {
      return (
        <select
          onChange={handleSelectChange}
          value={getCurrentMonthFilter()}
          className="month-dropdown-select"
          name="month-filter"
          id="month-filter"
        >
          {allFilterMonths.map((item) => (
            <option
              key={item.monthLabel}
              className="month-option"
              value={item.monthLabel}
            >
              {item.monthLabel}
            </option>
          ))}
        </select>
      );
    } else return <></>;
  }

  const getTotal = () => {
    const values = filteredArrayProps.map((item) => Number(item.value));
    const total = values.reduce((prev, cur) => {
      return prev + cur;
    }, 0);
    return total.toFixed(2);
  };

  if (historyItemArrayProp.length < 1) {
    return <></>;
  }

  return (
    <div className="history-container">
      <div className="history">
        <div className="history-header">
          <h1 className="history-title">Payment History</h1>
          <DisplayMonthFilter></DisplayMonthFilter>
        </div>
        <div className="total-section">
          <h2 className="total-label">Total:</h2>
          <h2 className="total-value">{getTotal()}</h2>
        </div>
        <hr className="header-hr" />
        <div className="history-array">
          {filteredArrayProps.map((item) => (
            <div key={item._id}>
              <HistoryItem key={item._id} historyItemProp={item}></HistoryItem>
              <hr className="line-separator" />
            </div>
          ))}
        </div>
      </div>
      <PieChartComponent historyData={filteredArrayProps}></PieChartComponent>
    </div>
  );
}

export default History;
