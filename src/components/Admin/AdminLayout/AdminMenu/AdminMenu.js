import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import "./AdminMenu.scss";

export function AdminMenu() {
  const { pathname } = useLocation();
  const {
    user: { role },
  } = useAuth();
  const isAdmin = role === "admin";

  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };

  return (
    <Menu fluid vertical icon text className="admin-menu">
      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/users"
            active={isCurrentPath("/admin/users")}
          >
            <Icon name="user outline" />
            Usuario
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/admin/directors"
            active={isCurrentPath("/admin/directors")}
          >
            <Icon name="user doctor" />
            Directores
          </Menu.Item>
        </>
      )}

      <Menu.Item
        as={Link}
        to="/admin/series"
        active={isCurrentPath("/admin/series")}
      >
        <Icon name="comment alternate outline" />
        Series
      </Menu.Item>
    </Menu>
  );
}
