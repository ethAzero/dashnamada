
import { getListPage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
import ChainStats from "./components/card_stats";
import { InputSearch } from "./components/InputSearch";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  return (
    <>
      <SeoMeta />
      <InputSearch/>
      <ChainStats/>
    </>
  );
};

export default Home;
