import React from "react";
import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../layouts";
import { Home, Series, Post } from "../pages/web";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/series" element={loadLayout(ClientLayout, Series)} />
      <Route path="/series/:path" element={loadLayout(ClientLayout, Post)} />
    </Routes>
  );
}
