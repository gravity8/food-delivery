
import {useState} from "react";

export default function DeleteItemButton({label,onDelete}) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center z-50">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" className="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="primary">
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button className={"button hover:bg-white"} type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}