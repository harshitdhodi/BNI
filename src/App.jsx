import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/pages/Authentication/Login";
import CountryList from "./components/pages/country/ShowCountry";
import CityList from "./components/pages/cities/showCities";
import CreateCity from "./components/pages/cities/addCities";
import EditCity from "./components/pages/cities/EditCities";
import ChapterList from "./components/pages/chapter/showChapter";
import CreateChapter from "./components/pages/chapter/addchapter";
import EditChapter from "./components/pages/chapter/editChapter";
import DepartmentList from "./components/pages/department/showDepartment";
import CreateDepartment from "./components/pages/department/addDepartment";
import EditDepartment from "./components/pages/department/EditDepartment";
import MemberList from "./components/pages/member/showUser";
import CreateUser from "./components/pages/member/addMember";
import EditCountry from "./components/pages/country/EditCountry";
import CreateCountry from "./components/pages/country/addCountry";
import Dashboard from "./components/pages/Dashboard";
import UserForm from "./components/pages/Authentication/Registration";
import ForgotPasswordForm from "./components/pages/Authentication/ForgotPassword";
import SetPasswordForm from "./components/pages/Authentication/SetPassword";
import MyGivesList from "./components/pages/member/Gives/MyGives";
import MyAskList from "./components/pages/member/Asks/MyAsks";
import MyMatches from "./components/pages/member/MyMatches";
import AllGives from "./components/pages/AllGives/AllGives";
import AllAsks from "./components/pages/AllAsks/AllAsks";
import IndustryList from "./components/pages/Industry/ShowAllIndustry";
import CreateIndustry from "./components/pages/Industry/AddIndustry";
import EditIndustry from "./components/pages/Industry/EditIndustry";
import MyAllMatches from "./components/pages/member/MyAllMatches";
import EditMember from "./components/pages/member/editMember";
import BusinessList from "./components/pages/business/Business";
import BusinessForm from "./components/pages/member/business/AddBusiness";
import MyBusinessList from "./components/pages/member/business/MyBusiness";
import CreateMyGives from "./components/pages/member/Gives/AddGives";
import EditMyGives from './components/pages/member/Gives/EditMyGives';
import CreateMyAsk from "./components/pages/member/Asks/AddAsks";
import EditMyAsk from "./components/pages/member/Asks/EditMyAsks";
import EditBusiness from "./components/pages/member/business/EditBusiness";
import EditAllAsks from "./components/pages/AllAsks/EditAllAsk";
import EditAllMyGives from "./components/pages/AllGives/EditAllGives";
import CreateMyAskByEmail from "./components/pages/AllAsks/AddMyAsks";
import CreateMyGivesByEmail from "./components/pages/AllGives/AddMyGives";
import CompanyList from "./components/pages/company/showCompanies";
import AddCompany from "./components/pages/company/AddCompany";
import EditCompany from "./components/pages/company/EditCompany";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token:", token);

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); // Set loading to false after checking the token
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state to handle async token check
  }

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/registration" element={<UserForm />} />
            <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
            <Route path="/setPassword" element={<SetPasswordForm />} />
          </>
        ) : (
          <Route path="/" element={<Sidebar />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" index element={<Dashboard />} />
            <Route path="/country" element={<CountryList />} />
            <Route path="/addCountry" element={<CreateCountry />} />
            <Route path="/editCountry/:id" element={<EditCountry />} />
            <Route path="/cities" element={<CityList />} />
            <Route path="/createCity" element={<CreateCity />} />
            <Route path="/editcities/:id" element={<EditCity />} />
            <Route path="/ChapterList" element={<ChapterList />} />
            <Route path="/createChapter" element={<CreateChapter />} />
            <Route path="/editChapter/:id" element={<EditChapter />} />
            <Route path="/departmentList" element={<DepartmentList />} />
            <Route path="/createDepartment" element={<CreateDepartment />} />
            <Route path="/editdepartment/:id" element={<EditDepartment />} />
            <Route path="/memberList" element={<MemberList />} />
            <Route path="/createCustomer" element={<CreateUser />} />
            <Route path="/myGives/:userId" element={<MyGivesList />} />
            <Route path="/myAsks/:userId" element={<MyAskList />} />
            <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
            <Route path="/setPassword" element={<SetPasswordForm />} />
            <Route path="/myMatch/:companyName/:dept/:userId" element={<MyMatches />} />
            <Route path="/allGives" element={<AllGives />} />
            <Route path="/allAsks" element={<AllAsks />} />
            <Route path="/industryList" element={<IndustryList />} />
            <Route path="/addIndustry" element={<CreateIndustry />} />
            <Route path="/editIndustry/:id" element={<EditIndustry />} />
            <Route path="/myMatches/:userId" element={<MyAllMatches />} />
            <Route path="/editMember/:id" element={<EditMember />} />
            <Route path="/business" element={<BusinessList />} />
            <Route path="/business_form/:userId" element={<BusinessForm />} />
            <Route path="/business_form" element={<BusinessForm />} />
            <Route path="/myBusiness/:userId" element={<MyBusinessList />} />
            <Route path="/createMyGives/:userId" element={<CreateMyGives />} />
            <Route path="/editMyGives/:userId/:id" element={<EditMyGives />} />
            <Route path="/createMyAsks/:userId" element={<CreateMyAsk />} />
            <Route path="/editMyAsks/:userId/:id" element={<EditMyAsk />} />
            <Route path="/editMyBusiness/:id" element={<EditBusiness />} />
            <Route path="/editMyBusiness/:userId/:id" element={<EditBusiness />} />
            <Route path="/editAllMyAsks/:id" element={<EditAllAsks />} />
            <Route path="/editAllMyGives/:id" element={<EditAllMyGives />} />
            <Route path="/addAsksbyEmail" element={<CreateMyAskByEmail />} />
            <Route path="/addGivesbyEmail" element={<CreateMyGivesByEmail />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/add_company" element={<AddCompany />} />
            <Route path="/edit_company/:id" element={<EditCompany />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
  