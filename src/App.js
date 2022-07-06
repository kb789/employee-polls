import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import Add from "./components/Add";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Question from "./components/Question";

import { getQuestions } from "./features/questionsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const { currUser, isLoading } = useSelector((store) => store.currUser);
  const { currPage } = useSelector((store) => store.currPage);

  const { isLoadingTwo, questions } = useSelector((store) => store.questions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  if (!isLoading && currUser === "") {
    return <Login />;
  }
  if (isLoading || isLoadingTwo) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <Nav />

      <Routes>
        <Route path="/" on exact element={<Home />}></Route>
        <Route path="/add" exact element={<Add />}></Route>
        <Route path="/leaderboard" exact element={<Leaderboard />}></Route>
        <Route path="/login" exact element={<Login />}></Route>

        <Route path="/question/:id" element={<Question/>} />
      </Routes>
    </main>
  );
}
export default App;
