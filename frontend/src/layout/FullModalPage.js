import ReactDOM from "react-dom";

function ModalPage({ children }) {
  return (
    <div className="fixed inset-0 w-full h-full z-50">
      <div className="bg-white w-full h-full">{children}</div>
    </div>
  );
}

export function FullModalPage({ children }) {
  const fullPageModalRoot = document.getElementById("full-page-modal-root");

  return ReactDOM.createPortal(
    <ModalPage>{children}</ModalPage>,
    fullPageModalRoot
  );
}
