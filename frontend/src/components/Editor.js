import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

export function Editor({ value, setValue, showHeader = true }) {
  return (
    <div className="w-full">
      {showHeader && (
        <label className="font-semibold text-2xl">description.</label>
      )}
      <QuillEditor
        className="mt-2"
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
}
