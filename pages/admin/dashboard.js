import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 px-4">
          <CardLineChart />
          <p>*Todos os dados fornecidos são fictícios!*</p>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;

export async function getServerSideProps(ctx) {

  const isAuth = (req) => {
    if (!req?.headers?.cookie) {
      return undefined;
    }

    const match = req.headers.cookie
      .split(';')
      .find((item) => item.trim().startsWith('isAuth='));

    if (!match) {
      return undefined;
    }

    return match.split('=')[1];
  };
  
  if (!isAuth(ctx.req)) {
    ctx.res.writeHead(303, { Location: '/auth/login' });
    ctx.res.end();
  }
  return { props: {} };
}
