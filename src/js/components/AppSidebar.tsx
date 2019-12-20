import React from 'react';
import styled from 'styled-components';
import { Script } from '../util';

const SidebarContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 210px;
  background-color: ${props => props.theme.sidebarColor};
  color: ${props => props.theme.secondaryTextColor};
`;

const SidebarListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  overflow-y: auto;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarListItem = styled.li<{ active?: boolean }>`
  padding: 0.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #aaa;

  &:hover {
    background-color: ${props => props.theme.listItemActiveColor};
    cursor: pointer;
  }
`;

const SidebarAddListItem = styled(SidebarListItem)`
  border: none;
  margin-top: auto;
`;

interface ScriptListItemProps {
  active: boolean;
  script: Script;
  onClick: (id: Script['id']) => void;
  onQuickActionClicked: (id: Script['id']) => void;
}

const ScriptListItem = ({
  active,
  script,
  onClick,
  onQuickActionClicked,
}: ScriptListItemProps) => {
  const { title, id } = script;

  return (
    <SidebarListItem active={active} onClick={() => onClick(id)}>
      <span>{title}</span>
      <i onClick={() => onQuickActionClicked(id)}>Run</i>
    </SidebarListItem>
  );
};

const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 0.5rem;
  border-bottom: 1px solid #aaa;

  &:focus {
    outline: inset 1px solid red;
  }
`;

interface AppSidebarProps {
  onListItemClicked: (id: string) => void;
  onAddItemClicked: () => void;
  onQuickActionClicked: (id: string) => void;
  onSearchFilterChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
  scripts: Script[];
}

export const AppSidebar = ({
  onListItemClicked,
  onAddItemClicked,
  onQuickActionClicked,
  onSearchFilterChanged,
  searchInput,
  scripts,
}: AppSidebarProps) => (
  <SidebarContainer>
    <SearchInput
      value={searchInput}
      onChange={onSearchFilterChanged}
      placeholder="Filter scripts..."
    />
    <SidebarListContainer>
      <SidebarList>
        {scripts.map((script, i) => (
          <ScriptListItem
            active={i % 2 === 0}
            onClick={onListItemClicked}
            onQuickActionClicked={onQuickActionClicked}
            script={script}
            key={script.id}
          />
        ))}
        <SidebarAddListItem onClick={onAddItemClicked}>
          Add New Script
        </SidebarAddListItem>
      </SidebarList>
    </SidebarListContainer>
  </SidebarContainer>
);
