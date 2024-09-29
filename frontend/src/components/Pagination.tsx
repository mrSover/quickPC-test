import { FC } from 'react'

interface PaginationProps {
  pages: number[];
  setPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pages, setPage }) => {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {
        pages.map(page =>
          <button
            style={{ background: "none" }}
            key={page}
            onClick={() => setPage(page)}
          >{page}
          </button>
        )
      }
    </div>
  )
}

export default Pagination;