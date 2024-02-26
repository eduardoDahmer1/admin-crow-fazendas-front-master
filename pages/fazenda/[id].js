import React from "react";
import Admin from "layouts/Admin.js";
import Slider from "react-slick";

export default function Fazenda({fazenda}) {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Detalhes da fazenda</h3>
            </div>
            <div className="border-t border-gray-200 flex flex-wrap justify-between">
                <dl className="flex flex-wrap w-full lg:w-6/12">
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Nome</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{fazenda.name}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Clique para acessar</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <a href={fazenda.link} className="block bg-blueGray-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 mt-2 ease-linear transition-all duration-150" rel="noreferrer" target="_blank">
                          Página Oficial
                          <i className="fas fa-sign-out-alt"></i>
                        </a>
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Valor</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{fazenda.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Proprietário</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{fazenda.owner}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{fazenda.description}</dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Cidade</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {fazenda.city}
                      </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Estado</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {fazenda.state}
                      </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Código</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {fazenda.code}
                      </dd>
                  </div>
                </dl>
                <div className="w-full lg:w-4/12">
                  <Slider {...settings}>
                    {fazenda.images.map((img) => {
                      return (
                        <div key={img.id}>
                          <img src={img.link} className="w-full" alt="Imagem fazenda"/>
                        </div>
                      )
                    })}
                  </Slider>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

Fazenda.layout = Admin;

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
  
    //Fetch Api
  
    // res.setHeader(
    //   'Cache-Control',
    //   'public, s-maxage=600, stale-while-revalidate=7200'
    // );

    const options = {
      method: 'get',
      headers: {
        Authorization: `Bearer apanTOmOuTetYrfaRgANtraW`,
      },
    }
  
    const response = await fetch(`https://goweb.cloudcrow.com.br/${ctx.query.id}`, options);
    const fazenda = await response.json();
  
    return { props: {fazenda} };
  }