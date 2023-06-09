import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { useSelector } from "react-redux";
import "./styles/Reset.css";
import Routes from "./routes/Routes";

import Footer from "./components/common/Footer";
import Loading from "./components/common/Loading";
import AdminNav from "./admin/AdminNav";
import Header from "./components/common/Header";

function App() {
  // const isLoggedIn = useSelector((state) => state.login.isLogin);

  return (
    <Router>
      <AdminNav />
      <Header />
      {/* lazy() 사용시 서스펜스 적용 안하면 오류발생함 */}
      <Suspense fallback={<Loading />}>
        <Routes></Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
