import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
import "antd/dist/antd.css";
import {
  useAsyncState,
  Status,
  createSource,
  ProducerProps
} from "react-async-states";

const appRouter = createBrowserRouter(createRoutesFromElements(AppRoutes));

type User = { username: string, password: string };
let producer = function producer(props: ProducerProps<User, Error, "Timeout">): Promise<User> {
  if (!props.args[0] || !props.args[1]) {
    throw new Error("username or password is incorrect");
  }
  return Promise.resolve({
    username: 'admin',
    password: 'admin',
  });
}

let source = createSource("source-demo", producer, {
  // initialValue: {
  //   username: "admin",
  //   password: "admin"
  // } as User
});

function EntryPoint() {
  let {state, lastSuccess, runc} = useAsyncState({source});

  if (state.status === Status.initial) {
    let data = state.data; // ts type of data <- User
  }
  if (state.status === Status.pending) {
    let data = state.data; // ts type of data <- null
  }
  if (state.status === Status.success) {
    let data = state.data; // ts type of data <- User
  }
  if (state.status === Status.error) {
    let data = state.data; // ts type of data <- Error
  }
  if (state.status === Status.aborted) {
    let data = state.data; // ts type of data <- "Timeout"
  }


  // runc({
  //   onSuccess(state) {
  //     let {data, status} = state; // <- data type is User, status is success
  //   },
  //   onError(state) {
  //     let {data, status} = state; // <- data type is Error, status is error
  //   },
  //   onAborted(state) {
  //     let {data, status} = state; // <- data type is "Timeout", status is aborted
  //   },
  // });


  return <RouterProvider router={appRouter}/>;
}

export default EntryPoint;