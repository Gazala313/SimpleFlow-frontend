import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { fetchUsers } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { useMsal } from "@azure/msal-react";
import Routes from "./routes/Routes";
import api from "./services/api";
import { setAdminData } from "./features/adminSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    handlegetUserDetails("gazala.parveen@tigeranalytics.com");
  }, [])

   const handlegetUserDetails = async (data) => {
          await api.get(`/users/user/${data}/`).then((response) => {
              dispatch(setAdminData(response.data));
          }).catch((error) => {
              console.error("Failed to fetch user details:", error);
          })
      };

  return (
    <ConfigProvider>
      <Routes/>
    </ConfigProvider>
  );
}

export default App;
