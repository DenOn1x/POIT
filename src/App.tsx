import React, {useEffect, useState} from 'react';
import s from './App.module.sass'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/pages/Main/Main";
import Navbar from "./components/app/Navbar/Navbar";
import Footer from "./components/app/Footer/Footer";
import AdminPage from "./components/pages/Admin/Admin";
import Profile from "./components/pages/Profile/Profile";
import UserList from "./components/pages/UserList/UserList";
import ProjectList from "./components/pages/ProjectsList/ProjectList";
import Notification from "./components/pages/Notification/Notification"
import 'bootstrap/dist/css/bootstrap.min.css';
import TeacherProjectsChecking from "./components/pages/TeacherProjectsChecking/TeacherProjectsChecking";
import TeacherProjectList from "./components/pages/TeacherProjects/TeacherProjectList";
import UserStore from "./mobx/stores/user.store";
import NotFount from "./components/pages/NotFount";

function App() {

    useEffect(() => {
        if (localStorage.getItem("user") != null){
            UserStore.setUserMe()
        }
    }, [])

    useEffect(() => {
        console.log(UserStore.user)
    }, [UserStore.user])


  return (
      <BrowserRouter>
          <Navbar />
          <div className={s.main__wrapper}>
              <Routes>
                  <Route path={'/'} element={<Main/>}/>
                  <Route path={'/users'} element={<UserList />}/>
                  <Route path={'/users/:id'} element={<Profile/>}/>
                  <Route path={'/admin/*'} element={<AdminPage/>}
                  />
                  <Route path="*" element={<h2>Ресурс не найден</h2>} />
                  <Route path={'/projects/:id'} element={<ProjectList/>} />
                  <Route path={'/projects-for-checking'} element={<TeacherProjectsChecking/>}/>
                  <Route path={'/notification'} element={<Notification/>}/>
                  <Route path={'/course-table'} element={<TeacherProjectList/>}/>
              </Routes>
          </div>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
