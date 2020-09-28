const clearWhiteCta = {
  bgcolor: "bg-transparent",
  textColor: "text-white",
  border: "border border-solid border-white rounded-full",
};

const clearBlueCta = {
  bgcolor: "bg-transparent",
  textColor: "text-brandteal",
  border: "border border-solid border-brandteal rounded-full",
};

const blueCta = {
  bgcolor: "bg-brandteal",
  textColor: "text-white",
  border: "border border-solid border-brandteal rounded-full",
};

function CtaHelper({ style } = {}) {
  let styles = {};
  if (style === "clear-blue") {
    styles = { ...clearBlueCta };
  } else if (style === "blue") {
    styles = { ...blueCta };
  } else if (style === "clear-white") {
    styles = { ...clearWhiteCta };
  }

  return styles;
}

export default CtaHelper;
