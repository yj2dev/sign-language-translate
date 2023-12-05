export const basicModules = {
  toolbar: false,
};

export const fullModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", { header: [1, 2, false] }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
  ],
};
