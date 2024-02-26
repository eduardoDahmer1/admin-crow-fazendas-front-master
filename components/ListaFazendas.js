import React from 'react'
import Link from "next/link";

const ListaFazendas = ({fazendas}) => {

  React.useEffect(() => {
  }, [fazendas])

  return (
    <>
        {fazendas?.data?.map((fazenda) => {
          return (
            <Link key={fazenda.id} as={`/fazenda/${fazenda.id}`} href="/fazenda/[id]">
                <a href={`/fazenda/${fazenda.id}`} className="w-1/2 lg:w-6/12 xl:w-3/12">
                <div className="m-1 p-4 bg-white rounded">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
                        style={{backgroundImage:`url(${fazenda.images[0].link})`, minHeight:'25vh', backgroundSize:'cover'}}
                    >
                    </div>
                    <h3 className="mt-4 text-gray-900">{fazenda.name}</h3>
                    <p className="mt-1 font-medium">
                    {fazenda.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                </div>
                </a>
            </Link>
            );
        })}
    </>
  )
}

export default ListaFazendas