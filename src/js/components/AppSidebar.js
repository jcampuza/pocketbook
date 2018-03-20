import React from 'react';
import styled from 'styled-components';

const AppSidebarContainer = styled.section`
  flex: 0 0 33%;
  border-left: 1px solid #999999;
  height: 100vh;
  background-color: rgba(0,0,0,0.05);
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
`;

const SidebarListItem = styled.li`
  padding: .5rem .5rem;
  border-bottom: 1px solid #999;

  &:hover {
    background-color: rgba(0,0,0,0.02);
    cursor: pointer;
  }
`;

const SidebarAddListItem = SidebarListItem.extend`
  background-color: #eaeaea;

  &:hover {
    background-color: rgba(0,0,0,0.03);
    cursor: pointer;
  }
`;

const ScriptListItem = ({ script, onClick }) => {
  const { title, id } = script;

  return (
    <SidebarListItem onClick={() => onClick(id)}>{title}</SidebarListItem>
  )
}

export const AppSidebar = ({ onListItemClicked, onAddItemClicked, scripts }) => (
  <AppSidebarContainer>
    <SidebarList>
      {scripts.map(script =>
        <ScriptListItem 
          onClick={onListItemClicked} 
          script={script} 
          key={script.id}
        /> 
      )}
      <SidebarAddListItem onClick={onAddItemClicked}>Add Item</SidebarAddListItem>
    </SidebarList>
  </AppSidebarContainer>
)