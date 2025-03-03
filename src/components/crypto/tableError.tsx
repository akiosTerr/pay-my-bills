import { TableErrorHeader } from "./cryptoTable.style"

const TableError = () => {
    return (
        <tr>
            <td colSpan={7}>
                <TableErrorHeader>
                    Network Error
                </TableErrorHeader>
            </td>
        </tr>
    )
}

export default TableError