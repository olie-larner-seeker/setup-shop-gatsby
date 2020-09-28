import React from "react";

const Cta = (cta) => {
  const { ctastyle } = cta;
  return (
    <div
      style={{ minWidth: "189px" }}
      className={`${ctastyle.bgcolor} ${ctastyle.border} ${ctastyle.textColor} ${cta.extraStyle} px-4 py-1`}
    >
      <a href={cta.ctaLink} className="font-bold">
        {cta.ctaCopy}
      </a>
    </div>
  );
};

export default Cta;
