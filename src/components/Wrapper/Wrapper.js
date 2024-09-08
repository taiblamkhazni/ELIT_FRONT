/**
 * @file Wrapper.js
 * @brief Ce fichier définit le composant Wrapper.
 */
import { Flex, Layout } from "antd";
import styled from "styled-components";
import { base } from "theme/base";

import Head from "../Head/Head";
import Sidebar from "../Sidebar/Sidebar";

const { Content, Sider } = Layout;

const CustomContent = styled(Content)`
  &&& {
    background: ${({ theme }) => theme.colors.primaires.blueLight};
    min-height: 1048px;
    margin-left: 2px;
  }
`;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const siderStyle = {
  position: "fixed",
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: `${base.backgrounds.white}`,
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  backgroundColor: `${base.backgrounds.white}`,
};

const rightContentStyle = {
  marginLeft: "17%",
};

/** Wrapper Component of a page */
const Wrapper = ({ children }) => {
  return (
    <Flex>
      <Layout style={layoutStyle}>
        <Sider width="17%" style={siderStyle}>
          <Sidebar />
        </Sider>
        <Layout style={rightContentStyle}>
          <Head style={headerStyle} />
          <CustomContent>{children}</CustomContent>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default Wrapper;
