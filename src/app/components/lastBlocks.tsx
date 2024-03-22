import { LinkIcon } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export type TxStat = {
  return_code: number;
  tx_count: number;
};

export type headerstat = {
  height: string;
  chain_id: string;
};

export type Resultstat = {
  header: any;
};

export type ChainStats = {
  header: any;
  time: string;
  tx_stats: TxStat[];
  result: any;
  sumTx: any;
};

// Get Transaction

async function getBlocks() {
  const res = await fetch(
    `${process.env.API3}/blocks`,
    { next: { revalidate: 5 } }, // Cache only 2 minutes
  );

  if (!res.ok) {
    throw Error("failed to fetch stats");
  }

  return await res.json();
}

export default async function Lastblocks() {
  let blocks = await getBlocks();

  return (
    <>
      <section className="section p-0 pb-8">
        <div className="container grid-cols-12">
          <div className="p-4  bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Blocks
              </h3>
            </div>
            <Suspense fallback={<p>Loading feed...</p>}>
              <div className="flow-root">
                {blocks.map((data: any) => {
                  return (
                    <>
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className=" w-9 h-9 rounded-full"
                                src="images/block.png"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm font-medium text-gray-900 truncate dark:text-white text-ellipsis"
                                key={data.header_height}
                              >
                                <Link
                                  className="flex justify-between hover:text-primary dark:hover:text-darkmode-primary"
                                  href={`/blocks/hash/${data.block_id}`}
                                >
                                  {data.block_id}
                                </Link>
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {data.header_time}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              <Link
                                className="flex justify-between hover:text-primary dark:hover:text-darkmode-primary"
                                href={`/blocks/height/${data.header_height}`}
                              >
                                #{data.header_height}
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </>
                  );
                })}
              </div>
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
