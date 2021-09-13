import { memo } from "react";
import { List, ListRowRenderer } from 'react-virtualized';
import { Button } from "./Button";

interface SideBarProps {
  genres: Array<{
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }>;
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
}

export function SideBarComponent({
  genres,
  selectedGenreId,
  buttonClickCallback
}: SideBarProps) {

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <Button
          key={genres[index].id}
          title={genres[index].title}
          iconName={genres[index].name}
          onClick={() => buttonClickCallback(genres[index].id)}
          selected={selectedGenreId === genres[index].id}
        />
      </div>
    )
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        <List
          height={400}
          rowHeight={80}
          width={350}
          overscanRowCount={2}
          rowCount={genres.length}
          rowRenderer={rowRenderer}
        />
      </div>

    </nav>
  )
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.genres, nextProps.genres) && prevProps.selectedGenreId === nextProps.selectedGenreId
})