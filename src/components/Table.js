import { useState, useMemo } from 'react'
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'
import "./Table.scss"

export const Table = ({ columns, rows }) => {
  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 10

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSearch = (value, accessor) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]

        return updatedFilters
      })
    }
  }

  const handleSort = (accessor) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }

  return (
    <>
      <table className = "table">
        <thead>
          <tr>
            {columns.map((column) => {
                if(column.accessor === "idea" || column.accessor === "response"){
                    return (
                        <th key={column.accessor}>
                        <span>{column.label}</span>
                        </th>
                    )
                }

                else{  
                    const sortIcon = () => {
                        if (column.accessor === sort.orderBy) {
                        if (sort.order === 'asc') { return '⬆️' }
                        return '⬇️'
                        } else { return '️↕️' }
                    }

                    return (
                        <th key={column.accessor}>
                        <span>{column.label}</span>
                        <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                        </th>
                    )
                }
            })}
          </tr>
          <tr>
            {columns.map((column) => {
                return (
                    <th>
                    {(column.accessor !== "response" && (
                        <input
                        key={`${column.accessor}-search`}
                        type="search"
                        placeholder={`Search ${column.label}`}
                        value={filters[column.accessor]}
                        onChange={(event) => handleSearch(event.target.value, column.accessor)}
                    />
                    ))}
                    </th>
                )
            })}
          </tr>
        </thead>
        <tbody>
        {
            rows.map(
            // currentData.map(
                idea =>
                <tr key = {idea.id} >
                    <td style={{"verticalAlign":"middle"}}>
                        {/* <b> <i>  */}
                            {idea.ideaId}
                        {/* </i> </b> */}
                    </td>
                    <td style={{"textAlign" : "left"}}>
                        <a href={'/viewIdea/' + idea.id}>
                            <div className='idea-title' style={{"fontWeight":"bold"}}> {idea.ideaTitle} </div>
                            <p style={{"width" : "500px", "height" : "4.3em", "overflowY":"hidden", "textOverflow": "ellipsis", "fontSize":"14px"}}>
                                {idea.ideaDescription}
                            </p>
                        </a>
                    </td>
                    <td>
                        <span style={{"display":"inline-block", "paddingInline":"13px"}}>
                            <AiOutlineLike size={"25px"} color={"DodgerBlue"} />
                            <div>{idea.likesCount}</div>
                        </span>
                        <span style={{"display":"inline-block"}}>
                            <AiOutlineComment size={"25px"} color={"Tomato"} />
                            <div>{idea.commentsCount}</div>
                        </span>
                    </td>
                    <td style={{"fontSize":"14px"}}> {idea.ideaStatus}</td>
                    <td style={{"fontSize":"14px"}}> {idea.createdBy}</td>
                    <td style={{"fontSize":"14px"}}>
                        {
                            new Date(idea.createdDate).toDateString().slice(8, 11) +
                            new Date(idea.createdDate).toDateString().slice(4, 8) + 
                            new Date(idea.createdDate).toDateString().slice(11)
                        }
                    </td>

                    {/* <td */}
                    {/* onClick={checkFavorite(idea.id)} */}
                    {/* > */}
                        {/* {checkFavorite(idea.id)} */}
                        {/* {console.log(isFavorite)} */}
                        {/* {isFavorite ? (<span>Favorite</span>) : (<span>Not favorite</span>)} */}

                    {/* </td> */}

                    <td>{idea.rewards} </td>
                        
                </tr>
                // </a>
            )
        }
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div>
    </>
  )
}
