
import {LinkIcon } from "lucide-react";
import Link from "next/link";
import { ResultResponse } from "../search/[id]/page";
import { date, map } from "zod";

export type TxStat = {
  return_code: number;
  tx_count: number;
};

export type headerstat={
  height : number;
  chain_id: string;
}

export type Resultstat={
  header : any;
}

export type ChainStats = {
  header : headerstat[];
  time: string;
  tx_stats: TxStat[];
  result : any;
  sumTx : any;
};

// Get Transaction
async function getStats(): Promise<ChainStats> {
  const res = await fetch(
    `${process.env.API2}/header`,
    { next: { revalidate: 5 } } // Cache only 2 minutes
  );

  if (!res.ok) {
    throw Error("failed to fetch stats");
  }

  return await res.json();
}

async function getSumTx() {
  const res = await fetch(
    `${process.env.API3}/sumTx`,
    { next: { revalidate: 5 } } // Cache only 2 minutes
  );

  if (!res.ok) {
    throw Error("failed to fetch stats");
  }

  return await res.json();
}
async function getSumTxtransfer() {
  const res = await fetch(
    `${process.env.API3}/sumTxtransfer`,
    { next: { revalidate: 5 } } // Cache only 2 minutes
  );

  if (!res.ok) {
    throw Error("failed to fetch stats");
  }

  return await res.json();
}

export default async function ChainStats() {
  let stats = await getStats();
  let sumTx = await getSumTx();
  let sumTxtransfer = await getSumTxtransfer();

  return (
    <>  
    <section className="section pt-14">
        <div className="container">
          <div className="row justify-center">
              <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
                <div
                  className="bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full  p-8">
                  <div
                    className="relative m-0 overflow-hidden text-center text-gray-700 bg-transparent  rounded-none shadow-none bg-clip-border border-white/10">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
                      Block Height
                    </p>
                    <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
                      <span className="mt-2 text-4xl">
                      <Link
                        className="flex justify-between hover:text-primary dark:hover:text-darkmode-primary"
                        href={`/blocks/height/${stats.result.header.height}`}
                        ><LinkIcon></LinkIcon>{stats.result.header.height}
                      </Link>
                      </span>
                    </h1>
                  </div>
                </div>
                <div
                  className="bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full p-8">
                  <div
                    className="relative m-0 overflow-hidden text-center text-gray-700 bg-transparent  rounded-none shadow-none bg-clip-border border-white/10">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
                      Chain Id
                    </p>
                    <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
                      <span className="mt-2 text-xl">{stats.result.header.chain_id}</span>
                    </h1>
                  </div>
                </div>
                <div
                  className="bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full p-8">
                  <div
                    className="relative m-0 overflow-hidden text-center text-gray-700 bg-transparent  rounded-none shadow-none bg-clip-border border-white/10">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
                      Total Transactions
                    </p>
                    <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
                      <span className="mt-2 text-4xl">{
                        sumTx.map((data:any)=>{
                          return (
                            <>
                              {data.count}
                            </>
                          )
                        })
                      }</span>
                    </h1>
                  </div>
                </div>
                <div
                  className="bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full  p-8">
                  <div
                    className="relative m-0 overflow-hidden text-center text-gray-700 bg-transparent  rounded-none shadow-none bg-clip-border border-white/10">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
                      Transfer Tx
                    </p>
                    <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
                      <span className="mt-2 text-4xl">{
                        sumTxtransfer.map((data:any)=>{
                          return (
                            <>
                              {data.count}
                            </>
                          )
                        })
                      }</span>
                    </h1>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
