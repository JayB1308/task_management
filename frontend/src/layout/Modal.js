import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { close } from "../store/slices/modalSlice";

function Modal({ children }) {
  const dispatch = useDispatch();

  return (
    <div
      className="relative z-10 overflow-hidden"
      onClick={() => dispatch(close())}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ModalPage({ children }) {
  const modalRoot = document.getElementById("modal-root");
  return ReactDOM.createPortal(<Modal>{children}</Modal>, modalRoot);
}
