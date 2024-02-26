import React from "react";
import Link from "next/link";
import {useRouter} from 'next/router';
import ListaFazendas from "components/ListaFazendas";

// components
export default function CardSettings() {

  const [search, setSearch] = React.useState('');
  const [valueMin, setValueMin] = React.useState('');
  const [valueMax, setValueMax] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [fazendas, setFazendas] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  let searchDefault = router.query.q ? router.query.q :'';
  let pageDefault = router.query.p ? router.query.p : 1;
  let valueMinDefault = router.query.min ? router.query.min : '';
  let valueMaxDefault = router.query.max ? router.query.max : '';

  const searchOn = (e) => {
    e.preventDefault();
    setPage(1)
    router.push({
      pathname: '/admin/fazendas',
      query: { q: search, p: 1, min: valueMin, max: valueMax }
    })
    fetchFazendas(search, 1, valueMin, valueMax);
  }

  const changePage = (e) => {
    let pageDefault = parseInt(e.currentTarget.getAttribute("data-page-ref"));
    setPage(pageDefault)
    fetchFazendas(search, pageDefault, valueMin, valueMax);
  }

  const fetchFazendas = async (search, page, min, max) => {
    setLoading(true)
    const response = await fetch(`/api/fazendas?q=${search}&p=${page}&min=${min}&max=${max}`);
    const json = await response.json();
    setFazendas(json);
    setLoading(false)
  }


  React.useEffect(()=>{
    setValueMax(router.query.max ? router.query.max : '')
    setValueMin(router.query.min ? router.query.min : '')
    setSearch(router.query.q ? router.query.q : '')
    setPage(parseInt(router.query.p ? router.query.p : 1))

    fetchFazendas(searchDefault, pageDefault, valueMinDefault, valueMaxDefault);
  },[])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Todas as fazendas</h6>
            {/* Form */}
            <form onSubmit={searchOn} className="md:flex w-6-12 flex-row items-center">

              <div className="relative flex-wrap items-stretch">
                <label className="z-10 absolute bg-white text-sm font-medium text-gray-500" style={{top:'-12px',paddingLeft:'5px'}}>Valor Mínimo</label>
                <input
                  type="text"
                  placeholder="100"
                  onChange={(e)=> setValueMin(e.currentTarget.value)}
                  style={{maxWidth:'105px'}}
                  value={valueMin}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                />
              </div>

              <div className="ml-2 relative flex-wrap items-stretch">
                <label className="z-10 absolute bg-white text-sm font-medium text-gray-500" style={{top:'-12px',paddingLeft:'5px'}}>Valor Máximo</label>
                <input
                  type="text"
                  placeholder="100"
                  value={valueMax}
                  onChange={(e)=> setValueMax(e.currentTarget.value)}
                  style={{maxWidth:'105px'}}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                />
              </div>

              <div className="ml-2 relative flex w-full xl:w-6/12 flex-wrap items-stretch">
                <button type="submit" className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search"></i>
                </button>
                <input
                  type="text"
                  value={search}
                  placeholder="O que precisa amigo?"
                  onChange={(e)=> setSearch(e.currentTarget.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex-auto px-2 lg:px-10 py-10">
          <div className="flex flex-wrap">
            { loading 
            ? <div className="w-full flex justify-center py-2"><img src="/img/loading.gif" alt="Gif de carregamento" width="50px"/></div>
            : fazendas?.data?.length === 0 ? <h1 className="py-2">Não temos registros para essa pesquisa :(</h1> : <ListaFazendas fazendas={fazendas}/> } 
          </div>

          <div className="py-2">
            <nav className="block">
              <ul className="flex pl-0 rounded list-none flex-wrap">

                {/* eslint-disable-next-line eqeqeq */}
                { page == 1
                ? ''
                : <>
                    <li className="p-1">
                      <Link as={`/admin/fazendas?q=${search}&p=${fazendas?.page?.prev}&min=${valueMin}&max=${valueMax}`} href="/admin/fazendas" passHref>
                        <a href data-page-ref={fazendas?.page?.prev} onClick={changePage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-blueGray-500">
                          <i className="fas fa-long-arrow-alt-left"></i>
                        </a>
                      </Link>
                    </li>

                    <li className="p-1">
                      <Link as={`/admin/fazendas?q=${search}&p=${fazendas?.page?.first}&min=${valueMin}&max=${valueMax}`} href="/admin/fazendas" passHref>
                        <a href data-page-ref={fazendas?.page?.first} onClick={changePage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-blueGray-500">
                          {fazendas?.page?.first}
                        </a>
                      </Link>
                    </li>
                  </>
                }
                {
                  page > 3 
                  ? <div className="flex" style={{alignItems:'end'}}><span>...</span></div>
                  : ''
                }
                {
                  page > 2
                  ? <li className="p-1">
                      <Link as={`/admin/fazendas?q=${search}&p=${page - 1}&min=${valueMin}&max=${valueMax}`} href="/admin/fazendas" passHref>
                        <a href data-page-ref={page - 1} onClick={changePage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-blueGray-500">
                          {page - 1}
                        </a>
                      </Link>
                    </li>
                  : ''
                }

                <li className="p-1">
                  <div className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid bg-white text-blueGray-300">
                    {page}
                  </div>
                </li>

                {
                  page < fazendas?.page?.last
                  ? <li className="p-1">
                      <Link as={`/admin/fazendas?q=${search}&p=${page + 1}&min=${valueMin}&max=${valueMax}`} href="/admin/fazendas" passHref>
                        <a href data-page-ref={page + 1} onClick={changePage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-blueGray-500">
                          {page + 1}
                        </a>
                      </Link>
                    </li>
                  : ''
                }

                {
                  page < fazendas?.page?.last - 2
                  ? <div className="flex" style={{alignItems:'end'}}><span>...</span></div>
                  : ''
                }

                { page < fazendas?.page?.last - 1
                ? <>
                    <li className="p-1">
                      <Link as={`/admin/fazendas?q=${search}&p=${fazendas?.page?.last}&min=${valueMin}&max=${valueMax}`} href="/admin/fazendas" passHref>
                        <a href data-page-ref={fazendas?.page?.last} onClick={changePage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-blueGray-500">
                          {fazendas?.page?.last}
                        </a>
                      </Link>
                    </li>
                    <li className="p-1">
                      <Link as={`/admin/fazendas?q=${search}&p=${fazendas?.page?.next}&min=${valueMin}&max=${valueMax}`} href="/admin/fazendas" passHref>
                        <a href data-page-ref={fazendas?.page?.next} onClick={changePage} className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-blueGray-500">
                          <i className="fas fa-long-arrow-alt-right"></i>
                        </a>
                      </Link>
                    </li>
                  </>
                : ''
                }

              </ul>
            </nav>
          </div>

        </div>
      </div>
    </>
  );
}