import { useEffect, useState } from "react";
import { GenreResponse } from "../models";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBaProps {
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

export function SideBar({ selectedGenreId, handleClickButton }: SideBaProps) {
  const [genres, setGenres] = useState<GenreResponse[]>([]);

  useEffect(() => {
    api.get<GenreResponse[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}