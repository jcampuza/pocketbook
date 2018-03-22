import React from 'react';
import styled from 'styled-components';

const AppSidebarContainer = styled.section`
  position: relative;
  flex: 1 0 22;
  height: 100vh;
  background-color: rgb(245, 245, 245);
`;

const SidebarList = styled.ul`
  height: 100%;
  list-style: none;
  padding: 0;
  overflow-y: auto;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const SidebarListItem = styled.li`
  padding: .5rem .5rem;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.active ? 'initial' : '#dedede'};

  &:hover {
    background-color: #ffffff;
    cursor: pointer;
  }
`;

const SidebarAddListItem = SidebarListItem.extend`
  background-color: #eaeaea;
  margin-top: auto;

  &:hover {
    background-color: rgba(0,0,0,0.03);
    cursor: pointer;
  }
`;

const ScriptListItem = ({ active, script, onClick, onQuickActionClicked }) => {
  const { title, id } = script;

  return (
    <SidebarListItem active={active}onClick={() => onClick(id)}>
      <span>{title}</span>
      <i onClick={() => onQuickActionClicked(id)}>Run</i>
    </SidebarListItem>
  )
}

export const AppSidebar = ({ onListItemClicked, onAddItemClicked, onQuickActionClicked, scripts }) => (
  <AppSidebarContainer>
    <SidebarList>
      {scripts.map((script, i) =>
        <ScriptListItem
          active={i % 2 === 0}
          onClick={onListItemClicked}
          onQuickActionClicked={onQuickActionClicked}
          script={script}
          key={script.id}
        />
      )}
      <SidebarAddListItem onClick={onAddItemClicked}>Add Item</SidebarAddListItem>
    </SidebarList>
  </AppSidebarContainer>
)