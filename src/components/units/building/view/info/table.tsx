import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { formatPrice } from "@/commons/utils/priceFormatter";

import type { IGeocodeBuildings } from "@/commons/types";

export default function InfoTable({ activeMarker }: { activeMarker: IGeocodeBuildings }) {
  return (
    <TableContainer
      component={Paper}
      style={{ minHeight: "10rem", maxHeight: "19rem", padding: "0.5rem", border: "1px solid #e5e5e5", borderRadius: "0.75rem", backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>계약일</TableCell>
            <TableCell align="right">평수</TableCell>
            <TableCell align="right">층</TableCell>
            <TableCell align="right">가격</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeMarker.buildings
            // .slice(0, 4) // 임시로 최대 4개만 보여주기
            .map((b, idx) => (
              <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {String(b.dealYear).slice(2, 4)}.{b.dealMonth}.{b.dealDay}
                </TableCell>
                <TableCell align="right">{Math.floor(b.excluUseAr * 0.3025)}평</TableCell>
                <TableCell align="right">{b.floor}층</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  {formatPrice(b.dealAmount)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
