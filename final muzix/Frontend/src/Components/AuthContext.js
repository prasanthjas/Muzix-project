import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const safeJSONParse = (item) => {
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  };

  const [isLogin,setIsLogin]=useState(false);
  const [authToken, setAuthToken] = useState(safeJSONParse(localStorage.getItem('auth-token')) || null);
  const [currentUser, setCurrentUser] = useState(safeJSONParse(localStorage.getItem('current-user')) || null);
  const [profileImageUrl, setProfileImageUrl] = useState(safeJSONParse(localStorage.getItem('pfp-url')) || null);
  const [account, setAccount] = useState(safeJSONParse(localStorage.getItem('current-account')) || null)
  const [isPaidPlan, setIsPaidPlan] = useState(localStorage.getItem('isPaidPlan') || null);

  const login = async(data) => {
    try {
      const response = await axios.post(`http://localhost:8080/auth/login`, data, {headers: {
        Authorization: `Bearer ${authToken}`,
      },});
      const token = response.data.token;
      const user=response.data.user;
      const pfpUrl = response.data.profileImageUrl.replace(/\s/g, '%20');
      console.log(user)
      setlogin(user, token, pfpUrl);
      fetchAccountDetails(user.username);
      console.log(isLogin);
      return true
    } catch (error) {
      return error
    }
  }

  
  const fetchAccountDetails = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8081/account`, {
        params: { username },
      });
      const accountData = response.data;  
  
      setAccount(accountData); 
      localStorage.setItem('current-account', JSON.stringify(accountData));  
  
      if (accountData.subscriptionType === "PAID") {
        setIsPaidPlan(true);
        localStorage.setItem('isPaidPlan', true);
      } else {
        setIsPaidPlan(false);
        localStorage.setItem('isPaidPlan', false);
      }
    } catch (error) {
      console.error("Error fetching account details: ", error);
    }
  };

  const setlogin = (user, token, url) => {
    setAuthToken(token);
    localStorage.setItem('auth-token', JSON.stringify(token));
    setCurrentUser(user)
    localStorage.setItem('current-user', JSON.stringify(user));
    setProfileImageUrl(url)
    localStorage.setItem('pfp-url', JSON.stringify(url));
    setIsLogin(true);
  };

  const logout = async () => {
    const data = authToken;
    try {
      await axios.post("http://localhost:8080/auth/logout", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }

    localStorage.removeItem('auth-token');
    setAuthToken(null);
    localStorage.removeItem('current-user')
    setCurrentUser(null)
    localStorage.removeItem('pfp-url')
    setProfileImageUrl(null)
    localStorage.removeItem("current-account")
    setAccount(null);
    setIsLogin(false);
    };

  return (
    <AuthContext.Provider value={{ authToken, currentUser, profileImageUrl, account,isLogin, isPaidPlan,  login, logout, setProfileImageUrl }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
