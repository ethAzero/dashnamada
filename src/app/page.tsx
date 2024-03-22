

import { getListPage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
import ChainStats from "./components/card_stats";
import { InputSearch } from "./components/InputSearch";
import Lastblocks from "./components/lastblocks";


export interface iInfo {
  chainId: string;
  epoch: string;
  height: string;
}



const Home = () => {
  
  return (
    <>
      <SeoMeta />
      <InputSearch/>
      <div>
      <ChainStats/>
      <Lastblocks/>
      </div>
    </>
  );
};

export default Home;
