"use client";

import ScrollSpy from "react-ui-scrollspy";

export default function Usespyscroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ScrollSpy>{children}</ScrollSpy>
    </div>
  );
}
