/* eslint-disable react/jsx-no-target-blank */
import React from "react";

export default function Index() {
  return (
    <div>...</div>
  );
}

export async function getServerSideProps(ctx) {
  ctx.res.writeHead(303, { Location: '/admin/dashboard' });
  ctx.res.end();

  return { props: {} };
}