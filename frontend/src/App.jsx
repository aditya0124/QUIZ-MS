import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Quiz from "./components/Quiz";
import QuizDetail from "./components/QuizDetail";
import Login from "./components/Login";
import CreateQuiz from "./pages/admin/CreateQuiz";
import Dashboard from "./pages/admin/Dashboard";
import EditQuiz from "./pages/admin/EditQuiz";
import ResultPage from "./components/ResultPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            {/* <HeroSection /> */}
            <Quiz/>
            {/* <Courses /> */}
          </>
        ),
      },
      {
        path: "login",
        element: (
            <Login/>
        ),
      },
      {
        path: "create-quiz",
        element: (
            <CreateQuiz/>
        ),
      },
      {
        path:"dashboard",
        element:(<Dashboard/>),
      },
      {
        path:"quiz/edit/:id",
        element:(<EditQuiz/>),
      },
      {
        path: "quiz-details/:id",
        element: (
          <QuizDetail/>
        ),
      },
      {
        path: "result",
        element: (
          <ResultPage/>
        ),
      },
    ],
  },
]);



function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App
