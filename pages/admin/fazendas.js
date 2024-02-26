import React from "react";

// components
import CardSettings from "components/Cards/CardSettings.js";
// layout for page

import Admin from "layouts/Admin.js";

export default function Fazendas() {

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12">
          <CardSettings />
        </div>
      </div>
    </>
  );
}

Fazendas.layout = Admin;

export async function getServerSideProps(ctx) {

  //Autenticação
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
  //Final Autenticação

  return { props: {} };
}