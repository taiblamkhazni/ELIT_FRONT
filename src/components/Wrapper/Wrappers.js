/**
 * @file Wrappers.js
 * @brief Ce fichier définit plusieurs composants de Wrapper.
 * @details Chaque composant est un wrapper avec des styles spécifiques.
 */
import styled from "styled-components"

/**
 * @brief HeaderWrapper : Header Wrapper Component
 **/
export const HeaderWrapper = styled.div`
  border-radius: 4px 4px 0px 0px;
  background: ${(props) => props.validate};
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: ${(props) => props.border};
`

/**
 * @brief Custom Wrapper of Avatar Section
 **/
export const AvatarWrapper = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  cursor: pointer;
`

/**
 * @brief Custom Wrapper of Footer Section
 **/
export const FooterWrapper = styled.div`
  margin: 1.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`

/**
 * @brief Custom Wrapper of Information Alerting Section
 **/
export const AlertInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`
