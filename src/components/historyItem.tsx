import { useUpdateHistoryCtx } from "Contexts";
import { removeHistoryItem } from "api_actions/history";
import { HistoryItemType } from "components/interfaces/interfaces";
import { FiTrash2 } from "react-icons/fi";

interface historyItemProp {
  historyItemProp: HistoryItemType;
}

function HistoryItem({ historyItemProp }: historyItemProp) {
  const updateHistoryCtx = useUpdateHistoryCtx()
  const valueformat = `R$ ${historyItemProp.value}`;
  const paymentDate = new Date(
    historyItemProp.paymentDate
  ).toLocaleDateString();
  const dueDate = new Date(historyItemProp.expirationDate).toLocaleDateString();
  const deleteItem = (id: string) => () => {
    const confirmation = window.confirm("Are you sure you want to delete the item?")
    if (confirmation) {
      removeHistoryItem(id, updateHistoryCtx)
    }
}
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
      <button
        onClick={deleteItem(historyItemProp._id)}
        title="delete"
        className="btn delete-item-btn"
      >
        <FiTrash2 />
      </button>
    </div>
  );
}

export default HistoryItem;
