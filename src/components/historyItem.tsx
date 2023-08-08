import { HistoryItemType } from "components/interfaces/interfaces";

interface historyItemProp {
  historyItemProp: HistoryItemType;
}

function HistoryItem({ historyItemProp }: historyItemProp) {
  const valueformat = `R$ ${historyItemProp.value}`;
  const paymentDate = new Date(
    historyItemProp.paymentDate
  ).toLocaleDateString();
  const dueDate = new Date(historyItemProp.expirationDate).toLocaleDateString();

  return (
    <div className="history-item">
      <div className="title-section">
        <h2 className="title">{historyItemProp.title}</h2>
        <div className="value-section">
          <h2 className="value">{valueformat}</h2>
        </div>
      </div>
      <div className="paid-section">
        <p className="paid-label">Paid in:</p>
        <p className="date">{paymentDate}</p>
      </div>
      <div className="exp-section">
        <p className="exp-label">Expired in:</p>
        <p className="date">{dueDate}</p>
      </div>
    </div>
  );
}

export default HistoryItem;
