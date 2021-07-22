import { useCallback } from "react";
import { ReactComponent as Map } from "../../assets/Map.svg";
import { ReactComponent as List } from "../../assets/Menu.svg";
import { BottomBarButton } from "./BottomBarButton";

export type Tab = "map" | "list";

interface Props {
  onTabSelected: (tab: Tab) => void;
  selectedTab: Tab;
}

export const BottomNavBar: React.FC<Props> = ({
  onTabSelected,
  selectedTab,
}) => {
  const handleSelectMap = useCallback(() => {
    onTabSelected("map");
  }, [onTabSelected]);

  const handleSelectList = useCallback(() => {
    onTabSelected("list");
  }, [onTabSelected]);

  return (
    <div className="h-16 flex flex-row bg-gray-50 py-2">
      <BottomBarButton
        title={"Map"}
        onClick={handleSelectMap}
        selected={selectedTab === "map"}
        renderIcon={(props) => <Map {...props} />}
      />
      <BottomBarButton
        title={"List"}
        onClick={handleSelectList}
        selected={selectedTab === "list"}
        renderIcon={(props) => <List {...props} />}
      />
    </div>
  );
};
