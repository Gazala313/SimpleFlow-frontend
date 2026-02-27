import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { fetchUsers } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { useMsal } from "@azure/msal-react";
import Routes from "./routes/Routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  return (
    <ConfigProvider>
      <Routes/>
    </ConfigProvider>
  );
}

export default App;
