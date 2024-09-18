import React, { useMemo } from "react";
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigations/Navigation';
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Incomes/Incomes";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    const orbMemo = useMemo(() => <Orb />, []);

    const {isAuthenticated} = useSelector(state => state.auth);

    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/"/>;
        }
        return children;
    };

    return (
        <Router>
            <AppStyled bg={bg} className="App">
                {orbMemo}
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Navigation active={1} setActive={() => {}} /> {/* Adjust active state as needed */}
                                        <Dashboard />
                                    </>
                                </ProtectedRoute> 
                            }
                        />
                        <Route
                            path="/dash"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Navigation active={2} setActive={() => {}} /> {/* Adjust active state as needed */}
                                        <Dashboard />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/income"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Navigation active={3} setActive={() => {}} />
                                        <Income />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/expense"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Navigation active={4} setActive={() => {}} />
                                        <Expenses />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </MainLayout>
            </AppStyled>
        </Router>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;
    main {
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 0;
        } 
    }
`;

export default App;
