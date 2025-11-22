import sanitizeHtml from "sanitize-html";
const sanitizeInput = (
  input: Record<string, string | number | File | null>
) => {
  const sanitized: Record<string, string | number | File | null> = {};

  for (const field in input) {
    const value = input[field];

    if (typeof value === "string") {
      sanitized[field] = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim();
    } else {
      sanitized[field] = value;
    }
  }

  return sanitized;
};
export default sanitizeInput;
