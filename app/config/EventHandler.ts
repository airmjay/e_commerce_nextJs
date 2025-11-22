const HandleEvent = <T>(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  setBody: CallableFunction,
  body: T,
  rest: string[]
) => {
  const { name, value } = e.target;

  const files = "files" in e.target ? e.target.files : null;

  const updatedValue = rest.includes(name)
    ? Number(value) || ""
    : name === "image"
    ? files
      ? files[0] || null
      : null
    : value;

  setBody({
    ...body,
    [name]: { input: updatedValue, error: "" },
  });
};

export default HandleEvent;
