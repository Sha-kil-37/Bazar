import { Suspense, lazy } from "react";
import Loading from "../components/Loding";
const Home = lazy(() => import("../components/Home"));

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
};

export default HomePage;
