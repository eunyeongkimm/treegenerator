import dynamic from "next/dynamic";

const Main = dynamic(() => import("./src/main"), {
  ssr: false,
});

const MainPage = () => {
  return <Main />;
};

export default MainPage;
