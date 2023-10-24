import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { Auth, Users, Series, Directores } from "../pages/admin";
import { useAuth } from "../hooks";

export function AdminRouter() {
  const { user } = useAuth();
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth />} />
      ) : (
        <>
          {["/admin", "/admin/series"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Series)}
            />
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route path="/admin/directors" element={loadLayout(AdminLayout, Directores)} />
        </>
      )}
    </Routes>
  );
}
